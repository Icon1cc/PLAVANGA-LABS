import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

import { ServiceMarquee } from "./service-marquee";

export function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <Image
          className="hero-image"
          src="/images/plavanga-ai-systems-hero.webp"
          alt="Abstract visualization of connected software and AI systems"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-content">
          <p className="hero-kicker">
            <span>Available for select projects</span>
            Software engineering + applied AI
          </p>
          <h1>
            Software &amp; AI systems
            <span>built for what is next.</span>
          </h1>
          <p className="hero-copy">
            Plavanga Labs helps ambitious teams design, build, and integrate
            digital products that are useful from day one and ready to grow.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Discuss your project
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#works">
              Explore our work
              <ArrowDown aria-hidden="true" />
            </a>
          </div>

          <ul className="hero-proof" aria-label="Delivery capabilities">
            <li>
              <Check aria-hidden="true" /> End-to-end delivery
            </li>
            <li>
              <Check aria-hidden="true" /> Senior technical ownership
            </li>
            <li>
              <Check aria-hidden="true" /> Vercel-ready web platforms
            </li>
          </ul>
        </div>

        <a className="scroll-cue" href="#about" aria-label="Continue to about us">
          <ArrowDown aria-hidden="true" />
        </a>
      </section>
      <ServiceMarquee />
    </>
  );
}
