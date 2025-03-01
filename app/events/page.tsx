import { EnquiryForm } from "@/components/events/EnquiryForm";
import { Packages } from "@/components/events/Packages";
import { SpaceGrid } from "@/components/events/SpaceGrid";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { Ticks } from "@/components/ui/Ticks";
import { weddingPerks } from "@/lib/data/events";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Weddings & Private Events",
  description:
    "Host rehearsal dinners, weddings, birthdays and company events for 12 to 140 guests in the Mezzanine, the Loggia and the Library Room at The Marlowe.",
  path: "/events",
  image: "/images/events-hall.webp",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Weddings & private events"
        title={
          <>
            Long tables, <em>good toasts,</em> rooms upstairs.
          </>
        }
        lede="Three private spaces, a kitchen that cooks for a crowd, and twenty-four rooms for everyone who’d rather not drive home. Rehearsal dinners, milestone birthdays, team offsites and small weddings for 12 to 140."
        image={{
          src: "/images/events-hall.webp",
          alt: "A long banquet set under string lights in a timber-beamed hall",
          position: "center 45%",
        }}
      />

      <section className="section wrap">
        <SectionHead eyebrow="The spaces" title="Pick a room. We’ll handle the rest." deco />
        <SpaceGrid />
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Packages"
            title="Simple, all-in pricing."
            lede="Per-person prices include staffing, linens, candles and a dedicated event host. Tax and 22% service are added at the end, and we’ll never surprise you with a cake-cutting fee."
          />
          <Packages />
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <SplitMedia
            image={{
              src: "/images/food-spread.webp",
              alt: "A table of shared plates, oysters and wine from the Family-Style Supper",
              width: 1290,
              height: 570,
            }}
          />
          <div>
            <Eyebrow dark>Weddings</Eyebrow>
            <h2>
              Stay for <em>the whole weekend.</em>
            </h2>
            <p>
              Book the Mezzanine or the Loggia for your wedding and we’ll hold a block of rooms at a
              reduced rate, with the Clawfoot Suite for the two of you. Friday rehearsal dinner in
              the Library Room, Saturday reception, Sunday recovery brunch downstairs.
            </p>
            <Ticks items={weddingPerks} />
          </div>
        </div>
      </section>

      <section className="section alt" id="enquire">
        <div className="wrap book-grid">
          <div>
            <Eyebrow dark>Enquire</Eyebrow>
            <h2>
              Tell us what you’re <em>planning.</em>
            </h2>
            <p>
              Share a few details and our events manager will reply within one business day with
              availability, a sample menu and a quote. Or call{" "}
              <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> and ask for events.
            </p>
            <p className="quote-inline">
              “They made a 70-person rehearsal dinner feel like a dinner party at a friend’s house.”{" "}
              <span>— Jordan K.</span>
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
