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
NEXT_PUBLIC_SITE_URL=https://www.plavangalabs.com
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=suman@plavangalabs.com
CONTACT_FROM_EMAIL=Plavanga Labs <website@plavangalabs.com>
```

`CONTACT_TO_EMAIL` is the Google Workspace mailbox that receives enquiries.
`CONTACT_FROM_EMAIL` is only a sender identity: it does not have to be a real
mailbox, but its domain must be verified at
[resend.com/domains](https://resend.com/domains). Resend will not send from a
free mailbox such as `@gmail.com` and rejects the send with a 403. Until the
domain verifies, the only sender Resend accepts is `onboarding@resend.dev`,
which can deliver only to the email on your Resend account. The app returns a
clear unavailable response when mail configuration is missing instead of
silently dropping a submission.

### Verifying plavangalabs.com in Resend

Google Workspace and Resend are separate concerns. Workspace handles inbound
mail for the domain; Resend needs its own DKIM and SPF records before it will
send anything. Add these at the DNS host for `plavangalabs.com`, then press
Verify in the Resend dashboard:

| Type | Name                            | Value                                  |
| ---- | ------------------------------- | -------------------------------------- |
| TXT  | `resend._domainkey`             | the DKIM `p=...` value from Resend     |
| MX   | `send` (priority 10)            | `feedback-smtp.us-east-1.amazonses.com` |
| TXT  | `send`                          | `v=spf1 include:amazonses.com ~all`    |

Resend puts SPF on the `send` subdomain on purpose, so it does not touch the
root `MX` and `SPF` records Google Workspace uses. Do not move that SPF value
onto the root domain: a second root `SPF` record invalidates both, and Workspace
mail starts failing authentication. DKIM sits on the root as
`resend._domainkey`, which is a distinct selector from Google's `google._domainkey`
and does not conflict.

Check status without opening the dashboard:

```bash
curl -s -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/domains
```

`status` moves from `not_started` to `verified` once the records propagate.
Sending from `@plavangalabs.com` fails with a 403 until then.

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
