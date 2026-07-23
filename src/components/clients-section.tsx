import { Quote } from "lucide-react";

import { clients } from "@/content/site";

import { SectionHeading } from "./section-heading";

export function ClientsSection() {
  return (
    <section className="section clients-section" id="clients">
      <div className="container reveal">
        <SectionHeading
          eyebrow="Clients"
          title="Who we build with."
          description="Early partners already working with Plavanga Labs. This list is just getting started."
        />
      </div>

      <div className="clients-track reveal" role="list">
        {clients.map((client) => (
          <article
            className={`client-card accent-${client.accent}`}
            role="listitem"
            key={client.name}
          >
            <div className="client-head">
              <span className="client-avatar" aria-hidden="true">
                {client.initial}
              </span>
              <div className="client-meta">
                <h3>{client.name}</h3>
                <p>{client.project}</p>
              </div>
            </div>

            <div className="client-quote">
              <Quote aria-hidden="true" />
              {client.quote ? (
                <p>{client.quote}</p>
              ) : (
                <p className="client-quote-pending">Review coming soon.</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
