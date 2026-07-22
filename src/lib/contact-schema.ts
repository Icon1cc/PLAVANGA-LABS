import { z } from "zod";

import { budgetOptions, serviceOptions } from "@/content/site";

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254),
    company: z.string().trim().max(100).optional().default(""),
    service: z.enum(serviceOptions),
    budget: z.enum(budgetOptions).optional(),
    message: z.string().trim().min(20).max(2_000),
    consent: z.literal(true),
    website: z.string().max(0).optional().default(""),
    startedAt: z.number().int().positive(),
  })
  .strict();

export type ContactSubmission = z.infer<typeof contactSchema>;

export const CONTACT_FORM_MINIMUM_MS = 1_500;
