import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerHours } from "@/lib/data/hours";
import { footerExplore, legalLinks } from "@/lib/data/nav";
import { addressLines, siteConfig } from "@/lib/site";

function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Brand />
          <p>
            A 1926 residential hotel on Alameda Row, restored as twenty-four rooms, a neighborhood
            tap room and a dining room that keeps the lights low.
          </p>
        </div>
        <div>
          <h3>Find us</h3>
          <p>
            <Lines lines={addressLines} />
          </p>
          <p>
            <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            <br />
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>
            <Lines lines={footerHours} />
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <p className="foot-links">
            {footerExplore.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </p>
        </div>
        <NewsletterForm />
      </div>
      <div className="wrap foot-base">
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. Please drink responsibly; 21+ in
          the Tap Room after 9pm.
        </span>
        <span>
          {legalLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
