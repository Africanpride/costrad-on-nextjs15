"use client";

import HeroSection from "@/components/HeroSection";
import { InstitutesIntro } from "@/components/InstitutesIntro";
import Start from "@/components/Start";
import { Testimonials } from "@/components/Testimonials";
import Preloader from "@/components/ui/animations/Preloader";
import BookIntro from "@/components/ui/BookIntro";
import CTA from "@/components/ui/CTA";
import Jumbotron from "@/components/ui/Jumbotron";
import Newsletter from "@/components/ui/Newsletter";
import Stage1 from "@/components/ui/Stage1";
import WhyCostrad from "@/components/WhyCostrad";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className="overflow-x-hidden space-y-3 ">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <HeroSection backgroundImageUrl="/images/united-nations.jpg" />
      <InstitutesIntro />
      <section
        className=" px-4 md:py-8 md:px-8 max-w-8xl mx-auto text-lg md:text-3xl md:text-center
       md:min-h-[40dvh]"
      >
        We equip you with the essential tools and mindset to confidently guide
        individuals, lead organizations, and oversee complex systems with
        clarity and purpose.{" "}
        <span className="text-purple-700">Effective leaders</span> demonstrate
        exceptional communication abilities, sound judgment, and sharp{" "}
        <span className="text-chart-2">analytical thinking</span>. They also
        have the capacity to uplift, energize, and mobilize those around them
        toward a shared vision.
      </section>

      <Jumbotron
        className="object-center"
        heroImage="center2.jpg"
        height="md:h-[650px]"
      />
      <div className="flex flex-col justify-center">
        <VelocityScroll
          className="uppercase md:text-3xl text-xs w-full mx-auto font-opensans font-thin "
          defaultVelocity={1}
        >
          Seeing the <span className="text-purple-700">invincible</span> &mdash;
          Touching the <span className="text-primary">intangible</span> &mdash;
          Seeing the invincible &mdash; Touching the intangible &mdash;
        </VelocityScroll>
      </div>

      <WhyCostrad />
      <CTA />
      <Testimonials />
      {/* <Newsletter /> */}
    </main>
  );
}
