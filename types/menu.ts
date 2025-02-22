export type DietaryTag = "V" | "VG" | "GF";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tags?: DietaryTag[];
};

export type MenuBlock = {
  id: string;
  title: string;
  note: string;
  items: MenuItem[];
};
