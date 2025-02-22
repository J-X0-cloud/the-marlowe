/**
 * Redirects from the three sites this one replaced: the hotel's WordPress theme, the Tap Room's
 * standalone site (with its sports-schedule plugin) and the restaurant's menu microsite.
 * Consumed by `redirects()` in next.config.ts.
 */
type Condition =
  | { type: "host"; value: string }
  | { type: "query"; key: string; value?: string };

export type LegacyRedirect = {
  source: string;
  destination: string;
  has?: Condition[];
};

const CANONICAL = "https://www.themarlowe.com";

export const legacyRedirects: LegacyRedirect[] = [
  // Retired domains → the matching section of the new site
  {
    source: "/:path*",
    has: [{ type: "host", value: "(www\\.)?marlowetaproom\\.com" }],
    destination: `${CANONICAL}/dining#tap-room`,
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "(www\\.)?diningatthemarlowe\\.com" }],
    destination: `${CANONICAL}/dining`,
  },

  // Hotel theme page slugs
  { source: "/home", destination: "/" },
  { source: "/accommodations", destination: "/rooms" },
  {
    source: "/accommodations/:room(streetcar-queen|courtyard-king|parlor-suite|clawfoot-suite)",
    destination: "/rooms#:room",
  },
  { source: "/rooms-suites", destination: "/rooms" },
  { source: "/book-now", destination: "/rooms#book" },
  { source: "/specials-packages", destination: "/rooms" },
  { source: "/restaurant", destination: "/dining" },
  { source: "/menus", destination: "/dining" },
  { source: "/tap-room", destination: "/dining#tap-room" },
  { source: "/cocktails", destination: "/dining#bar" },
  { source: "/happenings", destination: "/dining#weekly" },
  { source: "/sports-schedule", destination: "/dining#weekly" },
  { source: "/reservations", destination: "/dining#reserve" },
  { source: "/weddings", destination: "/events" },
  { source: "/private-events", destination: "/events" },
  { source: "/meetings-events", destination: "/events" },
  { source: "/event-inquiry", destination: "/events#enquire" },
  { source: "/about", destination: "/visit#story" },
  { source: "/history", destination: "/visit#story" },
  { source: "/location", destination: "/visit#getting-here" },
  { source: "/faq", destination: "/visit#faq" },
  { source: "/contact", destination: "/visit#contact" },

  // Uploaded PDF menus and event kits
  { source: "/wp-content/uploads/:year/:month/:file(.*menu.*\\.pdf)", destination: "/dining" },
  {
    source: "/wp-content/uploads/:year/:month/:file(.*(?:event|wedding).*\\.pdf)",
    destination: "/events",
  },

  // Plugin and archive URLs
  { source: "/events-calendar/:path*", destination: "/dining#weekly" },
  { source: "/category/:slug*", destination: "/" },
  { source: "/feed", destination: "/" },
  { source: "/", has: [{ type: "query", key: "page_id", value: "7" }], destination: "/rooms" },
  { source: "/", has: [{ type: "query", key: "page_id", value: "9" }], destination: "/dining" },
];
