import Link from "next/link";
import { topbarHours } from "@/lib/data/hours";
import { siteConfig } from "@/lib/site";

export function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <span>{topbarHours}</span>
        <span className="topbar-r">
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          <Link href="/visit#getting-here">
            {siteConfig.address.street}, {siteConfig.address.neighborhood}
          </Link>
        </span>
      </div>
    </div>
  );
}
