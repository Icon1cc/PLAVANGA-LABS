"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navigation } from "@/content/site";

import { Logo } from "./logo";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Start a project
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        className={`mobile-nav ${isOpen ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {navigation.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
        <a
          className="mobile-nav-cta"
          href="#contact"
          onClick={() => setIsOpen(false)}
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}
