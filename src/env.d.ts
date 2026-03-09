/// <reference types="astro/client" />

// Cloudflare Workers runtime bindings (supplements the auto-generated worker-configuration.d.ts)
// Run `wrangler types` after adding new bindings to regenerate the base file.
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        ASSETS: Fetcher;
        // Secret env vars — set via `wrangler secret put <NAME>` or Cloudflare dashboard
        TURNSTILE_SECRET_KEY: string;
        CONTACT_EMAIL: string;
        RESEND_API_KEY: string;
      };
    };
  }
}
