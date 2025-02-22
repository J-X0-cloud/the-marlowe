export const tableTimes = ["17:30", "18:00", "19:00", "19:30", "20:30"] as const;

export const partySizes = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5-8", label: "5–8" },
] as const;

export const seatingAreas = [
  { value: "dining-room", label: "Dining Room" },
  { value: "tap-room", label: "Tap Room" },
  { value: "loggia", label: "Loggia patio" },
] as const;

export const tablePolicies = [
  "High chairs and a kids’ menu until 8pm",
  "Tell us about allergies when you book; the kitchen will call you back",
  "Dogs welcome on the Loggia patio",
];

export type TableTime = (typeof tableTimes)[number];
export type PartySize = (typeof partySizes)[number]["value"];
export type SeatingArea = (typeof seatingAreas)[number]["value"];
