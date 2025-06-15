"use client";

import { ArrowUpRight, ChevronRight, ChevronUp } from "lucide-react";
import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Section1Props = {
  name: string;
  overview?: string | null;
  editionBanner?: string | null;
};

const Section1 = ({ name, overview, editionBanner }: Section1Props) => {
  return (
    <section className="bg-background py-32">
      <div className="relative container flex flex-col items-center px-0! lg:pt-8">
        <DottedDiv>
          <div className="grid lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex w-full flex-col gap-8 px-10 py-20 md:px-14">
              <Badge
                variant="outline"
                className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-6 py-2 transition-all ease-in-out hover:gap-6"
              >
                <span className="text-sm font-medium tracking-tight text-muted-foreground">
                  Explore Institute Details
                </span>
                <ChevronRight className="size-4!" />
              </Badge>
              <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
                {name}
              </h1>
              <p className="tracking-tight text-muted-foreground md:text-xl">
                {overview ?? "This institute currently has no overview."}
              </p>
              <div className="flex w-full gap-2">
                <Button className="text-md h-12 w-fit rounded-full bg-primary px-10 text-primary-foreground">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="text-md h-12 w-12 rounded-full transition-all ease-in-out hover:rotate-45"
                >
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            {/* Right Content */}
            <DottedDiv className="group size-full place-self-end p-4 lg:w-4/6">
              <div className="relative h-full w-full bg-muted-2/50 p-4 transition-all ease-in-out group-hover:bg-muted-2">
                {/* Bg Image div */}
                <Image
                  src={editionBanner ? editionBanner : `/images/banner.jpg`}
                  alt="aiImage"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                  <p className="flex w-full items-center text-xl tracking-tighter text-background">
                    2025 <span className="mx-2 h-2.5 w-[1px] bg-white" />
                    March
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-6xl font-semibold tracking-tight text-background">
                      New <br />
                      Collection
                    </h2>
                    <div className="mt-2 h-1 w-6 rounded-full bg-background" />
                    <p className="mt-10 max-w-sm px-2 text-center text-lg leading-5 font-light tracking-tighter text-background/80">
                      Discover our latest release of beautifully crafted
                      components.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="group mb-6 flex cursor-pointer flex-col items-center justify-center text-background"
                  >
                    <ChevronUp
                      size={30}
                      className="transition-all ease-in-out group-hover:-translate-y-2"
                    />
                    <p className="text-xl tracking-tight text-background">
                      See All
                    </p>
                  </a>
                </div>
              </div>
            </DottedDiv>
          </div>
        </DottedDiv>
      </div>
    </section>
  );
};

export { Section1 };

// ─────────────────────────────────────────────────────────────────────────────

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="absolute top-4 -left-25 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute bottom-4 -left-25 h-[1.5px] w-[115%] bg-muted" />
    <div className="absolute -top-25 left-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute -top-25 right-4 h-[130%] w-[1.5px] bg-muted" />
    <div className="absolute top-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute top-[12.5px] right-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    <div className="absolute right-[12.5px] bottom-[12.5px] z-10 size-2 rounded-full bg-foreground" />
    {children}
  </div>
);
