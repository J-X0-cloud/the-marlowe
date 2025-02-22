import type { DietaryTag, MenuBlock } from "@/types/menu";

export const dietaryLegend: { tag: DietaryTag; label: string }[] = [
  { tag: "V", label: "vegetarian" },
  { tag: "GF", label: "gluten-free" },
  { tag: "VG", label: "vegan" },
];

export const diningRoomMenu = {
  title: "Autumn dinner menu",
  schedule: "The Dining Room · Tue–Sun, 5–10pm",
  blocks: [
    {
      id: "to-start",
      title: "To start",
      note: "Built for sharing across the table.",
      items: [
        { name: "Half-dozen oysters", description: "Baja kumiai, mignonette, lemon", price: 21 },
        { name: "Salmon tartare", description: "Yuzu kosho, cucumber, seeded lavash", price: 18 },
        {
          name: "Blistered shishitos",
          description: "Smoked salt, charred lime",
          price: 11,
          tags: ["VG"],
        },
        {
          name: "Burrata",
          description: "Late tomatoes, fig vinegar, basil oil, grilled bread",
          price: 17,
          tags: ["V"],
        },
      ],
    },
    {
      id: "mains",
      title: "Mains",
      note: "Served with house focaccia.",
      items: [
        {
          name: "Mussels & toast",
          description: "Tomato, fennel, saffron, grilled sourdough",
          price: 27,
        },
        {
          name: "Half roast chicken",
          description: "Salsa verde, schmaltz potatoes, bitter leaves",
          price: 32,
          tags: ["GF"],
        },
        {
          name: "Hanger steak frites",
          description: "Bearnaise, watercress, hand-cut fries",
          price: 38,
        },
        {
          name: "Sweet potato gnocchi",
          description: "Brown butter, sage, pepitas, pecorino",
          price: 26,
          tags: ["V"],
        },
      ],
    },
    {
      id: "to-finish",
      title: "To finish",
      note: "Pair with an amaro from the bar.",
      items: [
        { name: "Basque cheesecake", description: "Burnt top, macerated strawberries", price: 12 },
        {
          name: "Dark chocolate pot",
          description: "Olive oil, sea salt, crème fraîche",
          price: 11,
          tags: ["GF"],
        },
        { name: "Affogato", description: "Vanilla gelato, espresso, amaretti", price: 9 },
      ],
    },
  ] satisfies MenuBlock[],
};

export const barFood: MenuBlock = {
  id: "bar-food",
  title: "Bar food",
  note: "Until 10pm daily.",
  items: [
    {
      name: "Beer-battered fish & chips",
      description: "Rock cod, malt vinegar aioli, lemon",
      price: 22,
    },
    {
      name: "The Marlowe burger",
      description: "Dry-aged blend, aged cheddar, onion jam, fries",
      price: 19,
    },
    {
      name: "Pretzel & mustard",
      description: "Warm Bavarian pretzel, beer mustard",
      price: 10,
      tags: ["V"],
    },
    { name: "Crispy chicken sandwich", description: "Hot honey, pickles, slaw", price: 18 },
  ],
};

export const houseCocktails: MenuBlock = {
  id: "house-cocktails",
  title: "House cocktails",
  note: "$15 each · zero-proof versions of every drink for $10.",
  items: [
    {
      name: "The Marlowe martini",
      description: "Gin or vodka, dry vermouth, lemon oil, a very cold glass",
      price: 15,
    },
    { name: "Streetcar", description: "Rye, sherry, cherry, orange bitters", price: 15 },
    {
      name: "Jacaranda spritz",
      description: "Bitter aperitivo, butterfly pea, sparkling wine",
      price: 15,
    },
    {
      name: "Alameda gin & tonic",
      description: "Local gin, grapefruit, rosemary, tonic",
      price: 14,
    },
  ],
};

export const diningSubnav = [
  { label: "Dining Room", href: "#dining-room" },
  { label: "Tap Room", href: "#tap-room" },
  { label: "Cocktails", href: "#bar" },
  { label: "Weekly specials", href: "#weekly" },
  { label: "Reserve", href: "#reserve" },
];
