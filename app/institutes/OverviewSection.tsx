import { InstituteWithEditions } from "@/types/institute";
import React from "react";

export default function OverviewSection({
  institute,
}: {
  institute: InstituteWithEditions;
}) {
  const formattedStartDate = institute.editions[0]?.startDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(institute.editions[0]?.startDate))
    : "Coming Soon";
  const formattedEndDate = institute.editions[0]?.endDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(institute.editions[0]?.endDate))
    : "";
  return (
    <section className="max-w-8xl px-4 md:px-8   mx-auto h-auto">
      <div className="dark:ring-gray-700 lg:flex lg:max-w-none lg:mx-0 max-w-2xl mx-auto ring-1 ring-gray-200 rounded-3xl">
        <div className="p-4 md:p-8 sm:p-10 lg:flex-auto space-y-4">
          <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 ">
            {institute.name}
          </h4>
          <div className=" text-lg pb-5">{institute.overview}</div>
          <div className="  items-center gap-x-4 py-6 hidden">
            <h4 className="flex-none text-sm font-semibold leading-6 text-firefly-600 dark:text-firefly-400">
              What’s included
            </h4>
            <div className="h-px flex-auto bg-gray-100 dark:bg-gray-600" />
          </div>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2"
          ></ul>
        </div>

        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-300/30 dark:bg-blue-900/10 h-auto md:h-full py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-bold text-gray-600 dark:text-gray-500">
                Pay once, own it forever
              </p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  ${institute.editions[0]?.price}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
                  USD
                </span>
              </p>

              <div className="text-center w-auto py-5">
                <button
                  type="button"
                  className="cursor-pointer w-auto px-6 py-2 bg-firefly-600 text-white  leading-tight uppercase rounded shadow-md hover:bg-firefly-700 hover:shadow-lg focus:bg-firefly-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-firefly-800 active:shadow-lg   bg-lime-500 hover:bg-lime-600 uppercase\n                                transition duration-300 ease-in-out text-firefly-900 hover:text-white text-sm font-bold"
                  data-hs-overlay="#hs-subscription-with-image"
                >
                  Start Application: fdi 2025
                </button>
              </div>
              <div className="flex w-full items-center justify-center text-xs md:text-lg tracking-tighter ">

                <span className="text-[11px] sm:text-sm font-bold uppercase">
                  {formattedStartDate.toUpperCase()}
                  {institute.editions[0]?.endDate && (
                    <>
                      &nbsp;<span className="text-primary">&mdash;</span>
                      &nbsp;
                      {formattedEndDate.toUpperCase()}
                    </>
                  )}
                </span>
              </div>

              <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                Gain knowledge that lasts a lifetime. Invoices and receipts
                available for easy company reimbursement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
