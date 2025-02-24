export const siteConfig = {
  name: "The Marlowe",
  legalName: "The Marlowe Hotel & Tap Room",
  tagline: "Historic Hotel, Tap Room & Dining Room in North Park, San Diego",
  description:
    "The Marlowe is a restored 1926 hotel in North Park, San Diego: 24 rooms and suites, a neighborhood tap room with 16 local beers, a candlelit dining room and private event spaces.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.themarlowe.com",
  foundingYear: 1926,
  phone: { display: "(619) 555-0148", href: "tel:+16195550148", e164: "+16195550148" },
  email: "hello@themarlowe.com",
  address: {
    street: "3047 Alameda Row",
    neighborhood: "North Park",
    locality: "San Diego",
    region: "CA",
    postalCode: "92104",
    country: "US",
  },
  geo: { latitude: 32.74831, longitude: -117.12977 },
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=3047+Alameda+Row+San+Diego+CA+92104",
  checkIn: "15:00",
  checkOut: "11:00",
  themeColor: "#2a1418",
} as const;

export const addressLines = [
  siteConfig.address.street,
  `${siteConfig.address.neighborhood}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
] as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
