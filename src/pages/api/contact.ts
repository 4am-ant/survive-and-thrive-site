export const prerender = false;

import type { APIRoute } from "astro";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// FROM address — must be within the Email Routing domain once that is configured.
// Update this if Email Routing is set up on a different domain.
const FROM_ADDRESS = "noreply@surviveandthrivesupportgroup.co.uk";
const FROM_DISPLAY = `"Survive and Thrive Website" <${FROM_ADDRESS}>`;

/** Build a minimal RFC 2822 plain-text email string. */
function buildRawEmail(
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  body: string
): string {
  // Encode subject as UTF-8 quoted-printable header if it contains non-ASCII
  const safeSubject = subject.replace(/[^\x20-\x7E]/g, "?");
  const messageId = `<${crypto.randomUUID()}@surviveandthrivesupportgroup.co.uk>`;
  return [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${safeSubject}`,
    `Message-ID: ${messageId}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");
}

export const POST: APIRoute = async ({ request, locals }) => {
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const env = (locals as App.Locals).runtime?.env;

    // ── Parse form data ───────────────────────────────────────────────────────
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return json({ success: false, error: "Invalid request." }, 400);
    }

    const turnstileToken = (formData.get("cf-turnstile-response") as string | null) ?? "";
    const name    = ((formData.get("name")    as string) ?? "").trim();
    const email   = ((formData.get("email")   as string) ?? "").trim();
    const phone   = ((formData.get("phone")   as string) ?? "").trim();
    const message = ((formData.get("message") as string) ?? "").trim();
    const notes   = ((formData.get("notes")   as string) ?? "").trim();
    const source  = ((formData.get("source")  as string) ?? "contact-form").trim();

    if (!email) {
      return json({ success: false, error: "Email address is required." }, 400);
    }
    if (!turnstileToken) {
      return json({ success: false, error: "Security check token missing." }, 400);
    }

    // ── Verify Turnstile ──────────────────────────────────────────────────────
    const ip = request.headers.get("CF-Connecting-IP") ?? "";
    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env?.TURNSTILE_SECRET_KEY ?? "",
        response: turnstileToken,
        remoteip: ip,
      }),
    });
    const verifyData = (await verifyRes.json()) as { success: boolean };

    if (!verifyData.success) {
      return json(
        { success: false, error: "Security check failed. Please refresh and try again." },
        400
      );
    }

    // ── Build email body ──────────────────────────────────────────────────────
    const isChat = source === "chat";
    const lines: string[] = [
      `Source: ${isChat ? "Chat widget" : "Contact form"}`,
      `Name: ${name || "(not provided)"}`,
      `Email: ${email}`,
    ];
    if (phone) lines.push(`Phone: ${phone}`);
    if (message) lines.push("", "Message:", message);
    if (notes)   lines.push("", "Other notes:", notes);

    const emailBody = lines.join("\n");
    const subject   = `Website enquiry from ${name || email}`;
    const toAddress = env?.CONTACT_EMAIL ?? "surviveandthrive.fibro.cfs.me@outlook.com";

    // ── Send via Cloudflare Email Workers ─────────────────────────────────────
    // Requires: Email Routing enabled on the domain + send_email binding in wrangler.json.
    // The destination_address in wrangler.json must match toAddress.
    const rawEmail = buildRawEmail(FROM_DISPLAY, toAddress, email, subject, emailBody);

    // EmailMessage is a Cloudflare Workers runtime class — dynamic import avoids
    // build-time resolution errors if the module is not available locally.
    const { EmailMessage } = await import("cloudflare:email" as string);
    const emailMsg = new EmailMessage(FROM_ADDRESS, toAddress, rawEmail);
    await env.EMAIL.send(emailMsg);

    return json({ success: true });
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      500
    );
  }
};
