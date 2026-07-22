import { ArrowUp } from "lucide-react";

import { navigation, services } from "@/content/site";

import { Logo } from "./logo";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo />
          <p>
            Custom software and applied AI for teams building the next version
            of their business.
          </p>
          <a className="footer-contact-link" href="#contact">
            Project contact: PLAVANGA-LABS
          </a>
        </div>

        <div className="footer-column">
          <h3>Navigate</h3>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="footer-column footer-services">
          <h3>Services</h3>
          {services.slice(0, 4).map((service) => (
            <a key={service.title} href="#about">
              {service.shortTitle}
            </a>
          ))}
        </div>

        <a className="back-to-top" href="#home" aria-label="Back to top">
          <ArrowUp aria-hidden="true" />
        </a>
      </div>

      <div className="container privacy-note" id="privacy">
        <strong>Data privacy</strong>
        <p>
          Contact details are used only to respond to your enquiry and plan
          relevant project follow-up. Email delivery providers may process the
          submission on our behalf. Do not include confidential credentials or
          sensitive personal data in the form.
        </p>
      </div>

      <div className="container footer-bottom">
        <p>© {currentYear} Plavanga Labs. All rights reserved.</p>
        <div>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
