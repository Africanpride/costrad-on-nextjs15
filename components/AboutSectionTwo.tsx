import Link from "next/link";
import React from "react";

type Props = {};

const AboutSectionTwo = (props: Props) => {
  return (
    <div  className="py-8">
     <section className="max-w-8xl  mx-auto min-h-[80dvh] h-auto">
        <div
          className="relative overflow-hidden rounded-2xl bg-cover h-[80dvh] "
          style={{
            backgroundImage:
              "url('/images/lecture_in_progress.jpg')",
          }}
        >
          <div className="flex flex-col h-full justify-center md:p-8 mx-auto p-4 py-8 relative shadow-2xl z-10 ">
            <div className="py-10">
              <div className="text-center mx-auto ">
                <span className="inline-block text-lg font-medium text-primary uppercase ">
                  COSTrAD: Our Transformational Vision
                </span>

                {/* Title */}
                <div className="mt-5 max-w-4xl mx-auto">
                  <p className="block  text-white text-xl md:text-3xl font-['anton'] font-thin  uppercase">
                    Seeing the invisible, hearing the inaudible, touching the
                    intangible, perceiving the imperceptible and doing the
                    seemingly impossible.
                  </p>
                </div>
                {/* End Title */}

                {/* Buttons */}
                <div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center ">
                  <Link
                    className="inline-flex justify-center items-center gap-x-3 text-center  text-sm font-medium rounded-md text-primary transition py-3 px-4 "
                    href="/our-process"
                  >
                    Start the Journey
                    <svg
                      className="w-3 h-3"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    className=" px-4 inline-flex  justify-center items-center gap-2 rounded-lg border border-transparent text-background  bg-primary font-medium  hover:bg-gray-800  focus:outline-none transition-all text-sm  "
                    href="/institutes"
                  >
                    <svg
                      className="w-5 h-5 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>{" "}
                    Our Institutes
                  </Link>
                </div>
                {/* End Buttons */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSectionTwo;
