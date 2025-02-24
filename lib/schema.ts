import { eventSpaces } from "@/lib/data/events";
import { openingHours, type DayCode, type Venue } from "@/lib/data/hours";
import { roomTypes, TOTAL_ROOMS } from "@/lib/data/rooms";
import { absoluteUrl, siteConfig } from "@/lib/site";

const SCHEMA_DAYS: Record<DayCode, string> = {
  Mo: "https://schema.org/Monday",
  Tu: "https://schema.org/Tuesday",
  We: "https://schema.org/Wednesday",
  Th: "https://schema.org/Thursday",
  Fr: "https://schema.org/Friday",
  Sa: "https://schema.org/Saturday",
  Su: "https://schema.org/Sunday",
};

function hoursFor(venue: Venue) {
  return openingHours
    .filter((spec) => spec.venue === venue)
    .map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days.map((day) => SCHEMA_DAYS[day]),
      opens: spec.opens,
      closes: spec.closes === "24:00" ? "23:59" : spec.closes,
    }));
}

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
});

const amenity = (name: string, value: boolean | string = true) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value,
});

/** Hotel graph with the Tap Room and Dining Room as contained places. */
export function buildHotelSchema() {
  const hotelId = absoluteUrl("/#hotel");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": hotelId,
        name: siteConfig.name,
        description: siteConfig.description,
        url: absoluteUrl("/"),
        telephone: siteConfig.phone.e164,
        email: siteConfig.email,
        image: [
          absoluteUrl("/images/bar-hero.webp"),
          absoluteUrl("/images/room-parlor.webp"),
          absoluteUrl("/images/room-bath.webp"),
        ],
        address: postalAddress(),
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        hasMap: siteConfig.directionsUrl,
        foundingDate: String(siteConfig.foundingYear),
        numberOfRooms: TOTAL_ROOMS,
        checkinTime: siteConfig.checkIn,
        checkoutTime: siteConfig.checkOut,
        petsAllowed: "Dogs under 40 lb in Courtyard rooms",
        priceRange: `$${Math.min(...roomTypes.map((r) => r.fromRate))}–$${Math.max(...roomTypes.map((r) => r.fromRate))}+`,
        openingHoursSpecification: hoursFor("front-desk"),
        amenityFeature: [
          amenity("Free Wi-Fi"),
          amenity("Valet parking", "$28 per night"),
          amenity("EV charging"),
          amenity("Elevator"),
          amenity("Accessible rooms with roll-in showers"),
          amenity("Bar"),
          amenity("Restaurant"),
        ],
        makesOffer: roomTypes.map((room) => ({
          "@type": "Offer",
          url: absoluteUrl(`/rooms#${room.slug}`),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: room.fromRate,
            priceCurrency: "USD",
            unitCode: "DAY",
          },
          itemOffered: {
            "@type": "HotelRoom",
            name: room.name,
            description: room.description,
            bed: room.bed,
            occupancy: { "@type": "QuantitativeValue", maxValue: room.sleeps },
            floorSize: { "@type": "QuantitativeValue", value: room.squareFeet, unitCode: "FTK" },
          },
        })),
        containsPlace: [
          { "@id": absoluteUrl("/dining#tap-room") },
          { "@id": absoluteUrl("/dining#dining-room") },
          ...eventSpaces.map((space) => ({
            "@type": "EventVenue",
            name: space.name,
            maximumAttendeeCapacity: space.standing,
            url: absoluteUrl(`/events#${space.slug}`),
          })),
        ],
      },
      {
        "@type": "BarOrPub",
        "@id": absoluteUrl("/dining#tap-room"),
        name: "The Marlowe Tap Room",
        containedInPlace: { "@id": hotelId },
        address: postalAddress(),
        telephone: siteConfig.phone.e164,
        servesCuisine: "Pub food",
        openingHoursSpecification: hoursFor("tap-room"),
      },
      {
        "@type": "Restaurant",
        "@id": absoluteUrl("/dining#dining-room"),
        name: "The Marlowe Dining Room",
        containedInPlace: { "@id": hotelId },
        address: postalAddress(),
        telephone: siteConfig.phone.e164,
        servesCuisine: "Seasonal Californian",
        hasMenu: absoluteUrl("/dining"),
        acceptsReservations: absoluteUrl("/dining#reserve"),
        openingHoursSpecification: [...hoursFor("dining-room"), ...hoursFor("brunch")],
      },
    ],
  };
}
