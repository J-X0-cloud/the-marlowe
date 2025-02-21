import clsx from "clsx";
import type { ReactNode } from "react";

/** Small caps label. `dark` switches brass to oxblood for light backgrounds. */
export function Eyebrow({ dark = false, children }: { dark?: boolean; children: ReactNode }) {
  return <span className={clsx("eyebrow", dark && "dark")}>{children}</span>;
}
