import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { work } from "@/content/site";

import { SectionHeading } from "./section-heading";

export function WorksSection() {
  return (
    <section className="section works-section" id="works">
      <div className="container">
        <div className="works-heading-row">
          <SectionHeading
            eyebrow="Works"
            title="Built around outcomes, not a fixed technology list."
            description="Representative ways we can turn a complex product or AI brief into something people can use, measure, and maintain."
          />
          <a className="text-link" href="#contact">
            Plan an engagement
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="work-list">
          {work.map((item) => (
            <article className={`work-item work-${item.color}`} key={item.index}>
              <div className="work-visual" aria-hidden="true">
                <span className="work-index">{item.index}</span>
                <div className="work-window">
                  <div className="window-bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="window-content">
                    <div className="window-sidebar" />
                    <div className="window-main">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <CheckCircle2 />
                </div>
              </div>
              <div className="work-content">
                <p>{item.category}</p>
                <h3>{item.title}</h3>
                <p className="work-summary">{item.summary}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
