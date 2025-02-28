import { DietTag } from "@/components/ui/DietTag";
import { formatMenuPrice } from "@/lib/format";
import type { MenuBlock } from "@/types/menu";

export function MenuBlockList({ block }: { block: MenuBlock }) {
  return (
    <div className="menu-block" id={block.id}>
      <h3>{block.title}</h3>
      <p className="mnote">{block.note}</p>
      <ul className="menu">
        {block.items.map((item) => (
          <li key={item.name}>
            <div>
              <strong>
                {item.name}
                {item.tags?.map((tag) => (
                  <span key={tag}>
                    {" "}
                    <DietTag tag={tag} />
                  </span>
                ))}
              </strong>
              <span>{item.description}</span>
            </div>
            <b>{formatMenuPrice(item.price)}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
