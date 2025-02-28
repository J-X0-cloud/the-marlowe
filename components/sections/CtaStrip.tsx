import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { BOOK_ROOM_HREF } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site";

export function CtaStrip() {
  return (
    <section className="cta-strip">
      <Image src="/images/palms-dusk.webp" alt="" width={960} height={720} sizes="100vw" />
      <div className="wrap cta-in">
        <h2>
          Your room is ready <em>when you are.</em>
        </h2>
        <p>
          Book direct for our best rate, a welcome drink at the bar and late checkout when we can
          swing it.
        </p>
        <div className="hero-ctas">
          <ButtonLink href={BOOK_ROOM_HREF}>Book a room</ButtonLink>
          <ButtonLink href={siteConfig.phone.href} variant="ghost">
            Call {siteConfig.phone.display}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
