import Image from "next/image";
import { MenuBlockList } from "@/components/dining/MenuBlockList";
import { DietTag } from "@/components/ui/DietTag";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { diningRoomMenu, dietaryLegend } from "@/lib/data/menus";

export function DinnerMenu() {
  return (
    <section className="section wrap menus" id="dining-room">
      <div className="menu-head">
        <div>
          <Eyebrow dark>{diningRoomMenu.schedule}</Eyebrow>
          <h2>{diningRoomMenu.title}</h2>
        </div>
        <p className="legend">
          {dietaryLegend.map(({ tag, label }) => (
            <span key={tag}>
              <DietTag tag={tag} /> {label}{" "}
            </span>
          ))}
        </p>
      </div>
      <div className="menu-grid">
        {diningRoomMenu.blocks.map((block) => (
          <MenuBlockList key={block.id} block={block} />
        ))}
      </div>
      <div className="menu-photos">
        <Image
          src="/images/mussels.webp"
          alt="Mussels with grilled bread, olives and a glass of red wine"
          width={600}
          height={600}
          sizes="(max-width: 680px) 100vw, 400px"
        />
        <Image
          src="/images/dining-corner.webp"
          alt="Round tables and upholstered chairs in the Dining Room lit by a brass wall sconce"
          width={1800}
          height={1200}
          sizes="(max-width: 680px) 100vw, 800px"
        />
      </div>
    </section>
  );
}
