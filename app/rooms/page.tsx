import { Amenities } from "@/components/rooms/Amenities";
import { BookingPanel, type StayDefaults } from "@/components/rooms/BookingPanel";
import { RoomCard } from "@/components/rooms/RoomCard";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Ticks } from "@/components/ui/Ticks";
import { defaultStay, isISODate } from "@/lib/dates";
import { bookingPolicies, roomTypes } from "@/lib/data/rooms";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Rooms & Suites",
  description:
    "Twenty-four restored rooms and suites in a 1926 North Park landmark, from Streetcar Queens to Clawfoot Suites. Book direct for our best rate.",
  path: "/rooms",
  image: "/images/room-parlor.webp",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readStay(params: Awaited<SearchParams>): StayDefaults {
  const get = (key: string) => {
    const value = params[key];
    return typeof value === "string" ? value : undefined;
  };
  const fallback = defaultStay();
  const checkIn = get("checkIn");
  const checkOut = get("checkOut");
  const guests = Number(get("guests"));
  const room = get("room");
  const hasStay = Boolean(checkIn && checkOut && isISODate(checkIn) && isISODate(checkOut));

  return {
    checkIn: hasStay && checkIn ? checkIn : fallback.checkIn,
    checkOut: hasStay && checkOut ? checkOut : fallback.checkOut,
    guests: Number.isInteger(guests) && guests >= 1 && guests <= 4 ? guests : 2,
    room: room && roomTypes.some((r) => r.slug === room) ? room : "any",
    code: get("code") ?? "",
    autoSearch: hasStay,
  };
}

export default async function RoomsPage({ searchParams }: { searchParams: SearchParams }) {
  const defaults = readStay(await searchParams);

  return (
    <>
      <PageHero
        eyebrow="Rooms & suites"
        title={
          <>
            Sleep upstairs from <em>the best bar</em> in North Park.
          </>
        }
        lede="Twenty-four rooms across three floors, each restored around its original windows, doors and tile, with the comforts a 1926 hotel never had: blackout drapes, quiet air conditioning and fast Wi-Fi."
        image={{
          src: "/images/room-headboard.webp",
          alt: "A king bed with crisp white pillows against a carved maple headboard",
          position: "center 40%",
        }}
      />

      <section className="section wrap">
        <Amenities />
        <div className="rooms">
          {roomTypes.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>

      <section className="section alt" id="book">
        <div className="wrap book-grid">
          <div>
            <Eyebrow dark>Reservations</Eyebrow>
            <h2>
              Check dates &amp; <em>rates.</em>
            </h2>
            <p>
              Choose your dates and we’ll show every available room, with the direct-booking perks
              already applied. Staying seven nights or more, or booking five rooms for a wedding
              block? Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and our
              front desk will put a quote together.
            </p>
            <Ticks items={bookingPolicies} />
          </div>
          <BookingPanel key={JSON.stringify(defaults)} defaults={defaults} />
        </div>
      </section>
    </>
  );
}
