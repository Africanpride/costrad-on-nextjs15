import Link from "next/link";
import React from "react";

type Props = {};

const CallToAction = (props: Props) => {
  return (
    <section className="p-4 sm:p-16 min-h-full h-full flex items-center justify-center">
      <div className="container ">
        <div className="flex w-full flex-col justify-center gap-16 overflow-hidden h-dvh sm:h-[60dvh]  rounded-lg bg-accent p-4  md:rounded-xl md:flex-row md:items-center md:p-16 ">
          <div className="sm:flex-1 py-2">
            <h3 className="mb-3 text-3xl sm:text-7xl font-semibold md:mb-4 md:text-4xl">
              Stay up to date
            </h3>
            <p className="text-muted-foreground md:text-lg">
              Be the first to know about our exciting events—get important
              updates, notifications, and announcements delivered straight to
              you.
            </p>
          </div>
          <div className="shrink-0">
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <input
                type="email"
                data-slot="input"
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-white md:min-w-72"
                placeholder="Enter your email"
              />
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-left text-xs text-muted-foreground">
              View our{/* */}{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
