/// <reference types="astro/client" />

// Cloudflare Workers runtime bindings (supplements the auto-generated worker-configuration.d.ts)
// Run `wrangler types` after adding new bindings to regenerate the base file.
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        ASSETS: Fetcher;
        // send_email binding — requires Cloudflare Email Routing to be enabled on the domain
        EMAIL: {
          send(message: {
            from: string;
            to: string;
            raw: string | ReadableStream;
          }): Promise<void>;
        };
        // Secret env vars — set in Cloudflare dashboard → Workers & Pages → Settings → Variables
        TURNSTILE_SECRET_KEY: string;
        CONTACT_EMAIL: string;
      };
    };
  }
}
