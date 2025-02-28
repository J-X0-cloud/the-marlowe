import clsx from "clsx";
import Image from "next/image";
import type { ImageAsset } from "@/types/hotel";

/** Image column for `.split` layouts; `tall` switches to a 4:5 crop. */
export function SplitMedia({ image, tall = false }: { image: ImageAsset; tall?: boolean }) {
  return (
    <div className={clsx("split-media", tall && "tall")}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 980px) 100vw, 600px"
      />
    </div>
  );
}
