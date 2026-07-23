"use client";

import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { budgetOptions, serviceOptions } from "@/content/site";

type FormStatus =
  | { state: "idle"; message: "" }
  | { state: "submitting"; message: "" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(0);
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting", message: "" });

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      service: form.get("service"),
      budget: form.get("budget") || undefined,
      message: form.get("message"),
      consent: form.get("consent") === "on",
      website: form.get("website"),
      startedAt: startedAtRef.current || Date.now(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setStatus({
        state: "success",
        message: result.message || "Thanks. We will be in touch soon.",
      });
      formRef.current?.reset();
      startedAtRef.current = Date.now();
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message. Please try again.",
      });
    }
  }

  return (
    <form className="contact-form reveal" ref={formRef} onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Name *</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Work email *</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Company</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            maxLength={100}
            placeholder="Company name"
          />
        </label>
        <label>
          <span>What can we help with? *</span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Estimated project budget</span>
        <select name="budget" defaultValue="">
          <option value="">Select a range</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Tell us about the project *</span>
        <textarea
          name="message"
          minLength={20}
          maxLength={2000}
          rows={5}
          placeholder="What are you trying to build, improve, or automate?"
          required
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent-field">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that Plavanga Labs may use these details to respond to my
          enquiry. *
        </span>
      </label>

      <div className="form-footer">
        <button
          className="button button-primary"
          type="submit"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? (
            <>
              Sending
              <LoaderCircle className="spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send enquiry
              <ArrowUpRight aria-hidden="true" />
            </>
          )}
        </button>

        {status.state !== "idle" && status.state !== "submitting" && (
          <p
            className={`form-status form-status-${status.state}`}
            role="status"
          >
            {status.state === "success" && <CheckCircle2 aria-hidden="true" />}
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
