import clsx from "clsx";
import { eventPackages } from "@/lib/data/events";
import { formatCurrency } from "@/lib/format";

export function Packages() {
  return (
    <div className="pkgs">
      {eventPackages.map((pkg) => (
        <div className={clsx("pkg", pkg.featured && "featured")} key={pkg.name}>
          <span className="kicker">{pkg.kicker}</span>
          <h3>{pkg.name}</h3>
          <p className="pp">
            {formatCurrency(pkg.pricePerPerson)} <small>per person</small>
          </p>
          <ul>
            {pkg.inclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
