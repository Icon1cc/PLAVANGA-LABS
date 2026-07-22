import { NextResponse, type NextRequest } from "next/server";

import {
  CONTACT_FORM_MINIMUM_MS,
  contactSchema,
} from "@/lib/contact-schema";
import { sendContactMessage } from "@/server/contact-service";

const MAX_REQUEST_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitRecord = { count: number; expiresAt: number };

const rateLimits = new Map<string, RateLimitRecord>();

function isRateLimited(key: string, now: number): boolean {
  if (rateLimits.size >= 1_000) {
    for (const [recordKey, record] of rateLimits) {
      if (record.expiresAt <= now) rateLimits.delete(recordKey);
    }

    const oldestKey = rateLimits.keys().next().value as string | undefined;
    if (rateLimits.size >= 1_000 && oldestKey) rateLimits.delete(oldestKey);
  }

  const current = rateLimits.get(key);

  if (!current || current.expiresAt <= now) {
    rateLimits.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { message: "The request is too large." },
      { status: 413 },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { message: "This endpoint accepts JSON only." },
      { status: 415 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();

  if (isRateLimited(clientKey, now)) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const rawBody = await request.text().catch(() => null);

  if (rawBody === null) {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { message: "The request is too large." },
      { status: 413 },
    );
  }

  const body: unknown = (() => {
    try {
      return JSON.parse(rawBody);
    } catch {
      return null;
    }
  })();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (now - parsed.data.startedAt < CONTACT_FORM_MINIMUM_MS) {
    return NextResponse.json({ message: "Request received." });
  }

  const result = await sendContactMessage(parsed.data);

  if (!result.ok) {
    const status = result.reason === "configuration" ? 503 : 502;
    return NextResponse.json(
      {
        message:
          "We could not send your message right now. Please try again shortly.",
      },
      { status },
    );
  }

  return NextResponse.json({ message: "Thanks. We will be in touch soon." });
}
