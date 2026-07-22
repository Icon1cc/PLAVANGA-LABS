import "server-only";

import type { ContactSubmission } from "@/lib/contact-schema";

type SendResult =
  | { ok: true }
  | { ok: false; reason: "configuration" | "provider" };

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function sendContactMessage(
  submission: ContactSubmission,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { ok: false, reason: "configuration" };
  }

  const company = submission.company || "Not provided";
  const budget = submission.budget || "Not provided";
  const subject = `New ${submission.service} enquiry from ${submission.name}`;
  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${company}`,
    `Service: ${submission.service}`,
    `Budget: ${budget}`,
    "",
    submission.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject,
      text,
      html: `
        <h2>New Plavanga Labs website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Service:</strong> ${escapeHtml(submission.service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Project details:</strong></p>
        <p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>
      `,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!response?.ok) {
    return { ok: false, reason: "provider" };
  }

  return { ok: true };
}
