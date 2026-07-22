import { Asterisk } from "lucide-react";

import { services } from "@/content/site";

const items = [...services, ...services];

export function ServiceMarquee() {
  return (
    <div className="marquee" aria-label="Plavanga Labs services">
      <div className="marquee-track">
        {items.map((service, index) => (
          <span
            className="marquee-item"
            key={`${service.shortTitle}-${index}`}
            aria-hidden={index >= services.length}
          >
            <Asterisk aria-hidden="true" />
            {service.shortTitle}
          </span>
        ))}
      </div>
    </div>
  );
}
