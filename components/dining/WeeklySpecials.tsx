import { SectionHead } from "@/components/ui/SectionHead";
import { weeklySpecials } from "@/lib/data/specials";

export function WeeklySpecials() {
  return (
    <section className="band" id="weekly">
      <div className="wrap">
        <SectionHead light eyebrow="Weekly specials" title="Plan your week around us." />
        <div className="specials">
          {weeklySpecials.map((night) => (
            <div key={night.day}>
              <span className="day">{night.day}</span>
              <strong>{night.title}</strong>
              <p>{night.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
