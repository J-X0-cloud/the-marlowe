import { diningSubnav } from "@/lib/data/menus";

export function DiningSubnav() {
  return (
    <nav className="subnav" aria-label="Menu sections">
      <div className="wrap">
        {diningSubnav.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
