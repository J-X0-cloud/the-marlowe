import type { Faq, Testimonial, TimelineEntry } from "@/types/hotel";

export const houseFacts = [
  { value: "24", label: "rooms & suites" },
  { value: "16", label: "San Diego taps" },
  { value: "3", label: "event spaces" },
];

export const threeWaysIn = [
  {
    kicker: "Stay",
    title: "Rooms & suites",
    body: "From snug courtyard queens to the corner parlor suites, every room keeps its original windows and gets a very good mattress.",
    cta: "View rooms →",
    href: "/rooms",
    image: {
      src: "/images/room-parlor.webp",
      alt: "A parlor suite with warm wood paneling, wall sconces and a king bed",
      width: 1800,
      height: 972,
    },
  },
  {
    kicker: "Eat & drink",
    title: "Tap Room & Dining Room",
    body: "Sixteen local taps and pub classics downstairs; a seasonal Californian menu and a serious martini in the dining room.",
    cta: "See the menus →",
    href: "/dining",
    image: {
      src: "/images/mussels.webp",
      alt: "A bowl of mussels in tomato broth with grilled bread, olives and a glass of red",
      width: 600,
      height: 600,
    },
  },
  {
    kicker: "Gather",
    title: "Weddings & private events",
    body: "The Loggia, the Library Room and the Mezzanine host rehearsal dinners, birthdays and team offsites for 12 to 140.",
    cta: "Plan an event →",
    href: "/events",
    image: {
      src: "/images/events-hall.webp",
      alt: "Long banquet tables under string lights in a timber-beamed hall",
      width: 960,
      height: 640,
    },
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "1926",
    body: "The Marlowe opens with 30 rooms, a lobby cigar counter and a ground-floor lunch room.",
  },
  {
    year: "1948",
    body: "The lunch room becomes a tavern; the mahogany back bar arrives by rail from a closing saloon in Los Angeles.",
  },
  {
    year: "1991",
    body: "Neighbors rally to keep the building off the demolition list. It’s named a local landmark two years later.",
  },
  {
    year: "2024",
    body: "A careful restoration reopens the hotel with 24 larger rooms, a new kitchen and the Loggia courtyard.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We came for one night and changed our flight. The Parlor Suite is gorgeous and the bar downstairs is the friendliest in the city.",
    name: "Dana R.",
    context: "stayed in October",
  },
  {
    quote:
      "Our rehearsal dinner in the Loggia was exactly what we pictured: string lights, long tables, and a team that thought of everything.",
    name: "Marcus & Elena T.",
    context: "private event",
  },
  {
    quote:
      "Best Sunday roast in San Diego, full stop. We’ve had a standing booking since spring.",
    name: "Priya S.",
    context: "North Park local",
  },
];

export const faqs: Faq[] = [
  {
    question: "Do I need a reservation to eat?",
    answer:
      "Not for the Tap Room: we keep half the room for walk-ins every night. For the Dining Room, Thursday jazz and Sunday roast, we recommend booking ahead.",
  },
  {
    question: "Where do I park?",
    answer:
      "Hotel guests can use our valet lot behind the building ($28 a night, two EV chargers). Diners will find metered and free street parking on Alameda Row and the side streets after 6pm.",
  },
  {
    question: "Is the building accessible?",
    answer:
      "Yes. There’s step-free access from the Alameda Row entrance, an elevator to both guest floors, accessible restrooms on the ground floor and four accessible rooms with roll-in showers.",
  },
  {
    question: "Can you cater for dietary requirements?",
    answer:
      "The menus mark vegetarian, vegan and gluten-free dishes, and the kitchen can adapt most plates. Add allergies to your booking and a chef will confirm before you arrive.",
  },
  {
    question: "Are kids and dogs welcome?",
    answer:
      "Kids are welcome in the Dining Room and Tap Room until 9pm, with high chairs and a kids’ menu. Dogs are welcome on the Loggia patio and in Courtyard rooms.",
  },
  {
    question: "What time is check-in?",
    answer:
      "Check-in is from 3pm and checkout is by 11am. We’ll store bags either side, and late checkout is free when we can offer it.",
  },
];
