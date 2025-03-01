import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AreaMap } from "@/components/visit/AreaMap";
import { ContactForm } from "@/components/visit/ContactForm";
import { FaqList } from "@/components/visit/FaqList";
import { InfoCards } from "@/components/visit/InfoCards";
import { faqs } from "@/lib/data/content";
import { BOOK_ROOM_HREF, BOOK_TABLE_HREF } from "@/lib/data/nav";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Visit, FAQs & Contact",
  description:
    "Hours, parking, directions, frequently asked questions and the history of The Marlowe, a 1926 hotel on Alameda Row in North Park, San Diego.",
  path: "/visit",
  image: "/images/pub-room.webp",
});

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={
          <>
            Find us a block off <em>University Avenue.</em>
          </>
        }
        lede="Everything you need before you come by: hours, parking, getting here from the airport, answers to the questions we hear most, and a little of the building’s history."
        image={{
          src: "/images/pub-room.webp",
          alt: "The wood-paneled Tap Room with booths and brass lamps",
          position: "center 40%",
        }}
      />

      <section className="section wrap visit-grid" id="getting-here">
        <InfoCards />
        <div className="map-wrap">
          <AreaMap />
        </div>
      </section>

      <section className="section alt" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Eyebrow dark>FAQs</Eyebrow>
            <h2>
              Good questions, <em>quick answers.</em>
            </h2>
            <p>
              Can’t find what you need? Email{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and a real person will
              get back to you the same day.
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="section wrap" id="story">
        <div className="split">
          <div>
            <Eyebrow dark>Our history</Eyebrow>
            <h2>
              A landmark that <em>never closed its bar.</em>
            </h2>
            <p>
              The Marlowe was built in 1926 by a local contractor who named it after his mother’s
              maiden name and rented rooms by the week to streetcar crews on the new University
              Avenue line. The ground floor held a lunch counter, a cigar stand and a lobby with the
              same black-and-white terrazzo you’ll walk across today.
            </p>
            <p>
              The lunch counter became a tavern after the war, and the tavern outlived the
              streetcars, the residential-hotel era and two near misses with the wrecking ball. In
              2024 a two-year restoration brought the upstairs back as a hotel, with fewer, bigger
              rooms, and turned the old service yard into the Loggia.
            </p>
            <p>We still pour from the 1948 back bar. Ask the bartender about the bullet hole.</p>
          </div>
          <SplitMedia
            tall
            image={{
              src: "/images/pub-lights.webp",
              alt: "Vintage filament bulbs hanging over the Loggia",
              width: 960,
              height: 721,
            }}
          />
        </div>
      </section>

      <section className="section alt" id="contact">
        <div className="wrap book-grid">
          <div>
            <Eyebrow dark>Contact</Eyebrow>
            <h2>
              Send us <em>a note.</em>
            </h2>
            <p>
              Lost property, press, partnerships or just a question about the neighborhood: drop us
              a line and we’ll reply within a day. For bookings, it’s quickest to use the{" "}
              <Link href={BOOK_ROOM_HREF}>room</Link> or <Link href={BOOK_TABLE_HREF}>table</Link>{" "}
              forms.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
