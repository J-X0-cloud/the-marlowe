import type { NavLink } from "@/types/hotel";

export const primaryNav: NavLink[] = [
  { label: "Rooms", href: "/rooms" },
  { label: "Eat & Drink", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Visit", href: "/visit" },
];

export const mobileNav: NavLink[] = [{ label: "Home", href: "/" }, ...primaryNav];

export const footerExplore: NavLink[] = [
  { label: "Rooms & suites", href: "/rooms" },
  { label: "Menus", href: "/dining" },
  { label: "Private events", href: "/events" },
  { label: "Visit & FAQs", href: "/visit" },
  { label: "Our history", href: "/visit#story" },
];

export const legalLinks: NavLink[] = [
  { label: "Accessibility", href: "/visit#faq" },
  { label: "Privacy", href: "/visit#contact" },
  { label: "Gift cards", href: "/visit#contact" },
];

export const BOOK_ROOM_HREF = "/rooms#book";
export const BOOK_TABLE_HREF = "/dining#reserve";
