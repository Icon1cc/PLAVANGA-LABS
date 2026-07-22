import { AtSign, Clock3, MapPin } from "lucide-react";

import { ContactForm } from "./contact-form";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <SectionHeading
            eyebrow="Contact us"
            title="Bring us the problem. We will help shape the path forward."
          />
          <p>
            Share a little about your product, workflow, or AI idea. We will
            review the context and reply with practical next steps.
          </p>

          <div className="contact-details">
            <div>
              <AtSign aria-hidden="true" />
              <span>Project contact</span>
              <strong>PLAVANGA-LABS</strong>
            </div>
            <div>
              <Clock3 aria-hidden="true" />
              <span>Typical response</span>
              <strong>Within two business days</strong>
            </div>
            <div>
              <MapPin aria-hidden="true" />
              <span>Working model</span>
              <strong>Remote, available worldwide</strong>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
