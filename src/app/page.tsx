import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorksSection } from "@/components/works-section";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Plavanga Labs",
  description:
    "Custom software development and applied artificial intelligence services.",
  areaServed: "Worldwide",
  serviceType: [
    "Custom software development",
    "AI integration",
    "Chatbot development",
    "Workflow automation",
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <WorksSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
