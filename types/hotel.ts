export type NavLink = { label: string; href: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type RoomType = {
  slug: string;
  name: string;
  /** Lowest nightly rate in USD, Sunday–Thursday. */
  fromRate: number;
  /** Friday and Saturday nights are priced at this multiple of the base rate. */
  weekendMultiplier: number;
  description: string;
  features: string[];
  sleeps: number;
  squareFeet: number;
  bed: string;
  /** Rooms of this type in the building. */
  inventory: number;
  image: ImageAsset;
};

export type Amenity = { title: string; body: string };

export type TimelineEntry = { year: string; body: string };

export type Testimonial = { quote: string; name: string; context: string };

export type Faq = { question: string; answer: string };

export type WeekNight = { day: string; title: string; body: string };

export type EventSpace = {
  slug: string;
  name: string;
  description: string;
  capacity: string;
  minimum: string;
  seated: number;
  standing: number;
  image: ImageAsset;
};

export type EventPackage = {
  kicker: string;
  name: string;
  pricePerPerson: number;
  inclusions: string[];
  featured?: boolean;
};
