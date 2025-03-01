import Link from "next/link";
import { DiningSubnav } from "@/components/dining/DiningSubnav";
import { DinnerMenu } from "@/components/dining/DinnerMenu";
import { MenuBlockList } from "@/components/dining/MenuBlockList";
import { TableReservationForm } from "@/components/dining/TableReservationForm";
import { WeeklySpecials } from "@/components/dining/WeeklySpecials";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Ticks } from "@/components/ui/Ticks";
import { barFood, houseCocktails } from "@/lib/data/menus";
import { tablePolicies } from "@/lib/data/tables";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Menus & Reservations",
  description:
    "Seasonal Californian dinner in the Dining Room, sixteen San Diego taps and pub food in the Tap Room, weekly specials and table reservations.",
  path: "/dining",
  image: "/images/food-spread.webp",
});

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Tap Room & Dining Room"
        title={
          <>
            Pints at the bar. <em>Dinner</em> by candlelight.
          </>
        }
        lede="Downstairs is two rooms under one pressed-tin ceiling: the Tap Room, pouring sixteen San Diego beers from noon, and the Dining Room, cooking seasonal Californian plates from Tuesday to Sunday."
        image={{
          src: "/images/food-spread.webp",
          alt: "Shared plates of oysters, salmon tartare and blistered peppers with wine",
          position: "center 55%",
        }}
      />
      <DiningSubnav />
      <DinnerMenu />

      <section className="section alt" id="tap-room">
        <div className="wrap split">
          <SplitMedia
            image={{
              src: "/images/pub-stools.webp",
              alt: "Leather-topped bar stools against the carved wooden bar",
              width: 960,
              height: 561,
            }}
          />
          <div>
            <Eyebrow dark>The Tap Room · daily, noon–midnight</Eyebrow>
            <h2>
              Sixteen taps, <em>all</em> brewed within ten miles.
            </h2>
            <p>
              The list changes weekly and leans on North Park and South Park brewers: crisp lagers,
              hazy IPAs, a nitro stout and always one sour. The kitchen sends out pub food until
              10pm.
            </p>
            <MenuBlockList block={barFood} />
          </div>
        </div>
      </section>

      <section className="section wrap" id="bar">
        <div className="split rev">
          <div>
            <Eyebrow dark>From the back bar</Eyebrow>
            <h2>
              Cocktails from <em>1926</em>, and a few from last week.
            </h2>
            <MenuBlockList block={houseCocktails} />
          </div>
          <SplitMedia
            image={{
              src: "/images/cocktail.webp",
              alt: "A gin and tonic garnished with lemon peel on a dark wood table",
              width: 960,
              height: 640,
            }}
          />
        </div>
      </section>

      <WeeklySpecials />

      <section className="section alt" id="reserve">
        <div className="wrap book-grid">
          <div>
            <Eyebrow dark>Reserve a table</Eyebrow>
            <h2>
              Save yourself <em>a seat.</em>
            </h2>
            <p>
              We hold half the Tap Room for walk-ins every night. Dining Room tables, Thursday jazz
              and Sunday roast are best booked ahead. Parties of nine or more, see{" "}
              <Link href="/events">private events</Link>.
            </p>
            <Ticks items={tablePolicies} />
          </div>
          <TableReservationForm />
        </div>
      </section>
    </>
  );
}
