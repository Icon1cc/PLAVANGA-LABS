# Plavanga Labs

Responsive landing page for Plavanga Labs, a software development and applied AI
studio. The application uses the Next.js App Router and includes a server-side
contact endpoint designed for Vercel.

## Run locally

Requirements:

- Node.js 20.9 or newer
- npm 10 or newer

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The form posts JSON to `POST /api/contact`. The route validates submissions,
rejects oversized or malformed requests, uses a honeypot and timing check, and
applies a best-effort per-instance rate limit. Valid enquiries are sent through
the Resend HTTP API.

Create `.env.local` from `.env.example` and set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=hello@your-domain.com
CONTACT_FROM_EMAIL=Plavanga Labs <website@your-domain.com>
```

`CONTACT_FROM_EMAIL` must use a sender domain verified at
[resend.com/domains](https://resend.com/domains). Resend will not send from a
free mailbox such as `@gmail.com`, and it rejects the send with a 403. Until a
domain is verified, the only sender Resend accepts is `onboarding@resend.dev`,
and that shared sender can deliver only to the email on your Resend account.
Verify a domain to send from your own brand to any recipient. The app returns a
clear unavailable response when mail configuration is missing instead of
silently dropping a submission.

Set the same variables in the Vercel project. The deployed site reads
environment variables from Vercel, not from a local `.env` file.

For production abuse protection across multiple Vercel instances, add a
distributed rate limit through Vercel Firewall or a shared store. The included
in-memory limit is only a first layer.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Install the Chromium test browser once, then run the desktop, tablet, and mobile
browser suite:

```bash
npx playwright install chromium
npm run test:e2e
```

## Deploy to Vercel

1. Import this repository in Vercel.
2. Add the four variables from `.env.example` to the project environment.
3. Deploy with the default Next.js build settings.

The copyright year is rendered dynamically on the server. The footer includes
the form data privacy notice requested for the site.
