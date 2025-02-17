import { AvailabilityBar } from "@/components/home/AvailabilityBar";
import { Hero } from "@/components/home/Hero";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { Intro } from "@/components/home/Intro";
import { ThreeWaysIn } from "@/components/home/ThreeWaysIn";
import { WeekBand } from "@/components/home/WeekBand";
import { CtaStrip } from "@/components/sections/CtaStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { SectionHead } from "@/components/ui/SectionHead";
import { testimonials } from "@/lib/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityBar />
      <Intro />
      <ThreeWaysIn />
      <WeekBand />
      <HistoryTimeline />
      <section className="section quotes-sec">
        <div className="wrap">
          <SectionHead eyebrow="Guest book" title="What people write on the way out." deco />
          <Testimonials items={testimonials} />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
