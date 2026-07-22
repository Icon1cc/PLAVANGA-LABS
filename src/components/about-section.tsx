import { ArrowUpRight } from "lucide-react";

import { deliveryPrinciples, services } from "@/content/site";

import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-intro">
          <SectionHeading
            eyebrow="About us"
            title="One technical partner from first decision to production."
          />
          <div className="about-copy">
            <p>
              We combine product thinking, software engineering, and applied AI
              so promising ideas do not get lost between strategy, design, and
              implementation.
            </p>
            <p>
              Our work starts with the real constraint: the customer problem,
              the existing system, or the operational bottleneck. Then we build
              the smallest dependable solution that can prove value.
            </p>
            <a href="#contact">
              Tell us what you are building
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                className={`service-item accent-${service.accent}`}
                key={service.title}
              >
                <div className="service-number">0{index + 1}</div>
                <div className="service-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span>{service.detail}</span>
              </article>
            );
          })}
        </div>
      </div>

      <div className="principles" aria-label="How Plavanga Labs works">
        <p className="principles-label">The feedback we optimize for</p>
        <div className="principles-viewport">
          <div className="principles-track">
            {[...deliveryPrinciples, ...deliveryPrinciples].map(
              (principle, index) => (
                <span
                  key={`${principle}-${index}`}
                  aria-hidden={index >= deliveryPrinciples.length}
                >
                  “{principle}”
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
