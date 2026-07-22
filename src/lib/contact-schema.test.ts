import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact-schema";

const validSubmission = {
  name: "Asha Mehta",
  email: "asha@example.com",
  company: "Northwind",
  service: "AI integration",
  budget: "$25k - $50k",
  message: "We need an AI search experience for our customer portal.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5_000,
} as const;

describe("contactSchema", () => {
  it("accepts a complete contact submission", () => {
    expect(contactSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("normalizes surrounding whitespace", () => {
    const result = contactSchema.parse({
      ...validSubmission,
      name: "  Asha Mehta  ",
    });

    expect(result.name).toBe("Asha Mehta");
  });

  it("rejects invalid emails and short messages", () => {
    const result = contactSchema.safeParse({
      ...validSubmission,
      email: "not-an-email",
      message: "Too short",
    });

    expect(result.success).toBe(false);
  });

  it("rejects bot-filled honeypot fields", () => {
    const result = contactSchema.safeParse({
      ...validSubmission,
      website: "https://spam.example",
    });

    expect(result.success).toBe(false);
  });

  it("requires explicit privacy consent", () => {
    const result = contactSchema.safeParse({
      ...validSubmission,
      consent: false,
    });

    expect(result.success).toBe(false);
  });
});
