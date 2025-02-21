import type { DietaryTag } from "@/types/menu";

const titles: Record<DietaryTag, string> = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-free" };

export function DietTag({ tag }: { tag: DietaryTag }) {
  return (
    <span className="tag" title={titles[tag]}>
      {tag}
    </span>
  );
}
