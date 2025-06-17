import React from "react";

export default function OverviewSection() {
  return (
    <section className="max-w-8xl px-4 md:px-8   mx-auto h-auto">
      <div className="dark:ring-gray-700 lg:flex lg:max-w-none lg:mx-0 max-w-2xl mx-auto ring-1 ring-gray-200 rounded-3xl">
        <div className="p-4 md:p-8 sm:p-10 lg:flex-auto space-y-4">
          <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 ">
            Family Development Institute
          </h4>
          <div className=" text-[16px]  text-gray-600 dark:text-gray-300 pb-5">
            <p>
              One of the key tenets of FDI is the belief in early intervention
              and nurturing during childhood. We offer comprehensive programs
              that focus on foundational aspects of brain architecture, early
              childhood development, and cultivating children into well-rounded
              individuals. By investing in these crucial early years, we lay the
              groundwork for a brighter future, ensuring that children reach
              their full potential.
            </p>
            <p> </p>
            <p>
              In addition to the core areas of brain development and early
              childhood, FDI provides insights into strategic and innovative
              child development systems. We believe that effective child
              development strategies are essential for creating a positive and
              nurturing environment that fosters growth, resilience, and
              happiness.
            </p>
            <p> </p>
            <p>
              Furthermore, FDI takes a forward-looking approach by exploring
              futuristic systems of education. We understand the evolving needs
              of the modern world and the changing dynamics of education. Our
              programs delve into innovative educational methods and approaches
              that prepare children for the challenges of the future, equipping
              them with the skills and knowledge necessary to thrive in an
              ever-changing society.
            </p>
            <p>
              By participating in FDI programs, individuals gain access to a
              wealth of knowledge and expertise from our distinguished faculty.
              Our faculty members are renowned experts in their respective
              fields, providing participants with comprehensive insights and
              practical strategies for family development.
            </p>
            <p> </p>
            <p>
              At FDI, we believe in the power of collaboration and learning from
              one another. Our programs foster an environment of open dialogue
              and exchange, encouraging participants to share their experiences
              and perspectives. We provide networking opportunities with
              industry professionals, thought leaders, and practitioners,
              creating a community of individuals passionate about strengthening
              families and promoting positive change.
            </p>
            <p> </p>
            <p>
              The challenges faced by families in Africa and around the world
              are significant. Issues such as divorce rates, domestic violence,
              child marriage, single-parent households, and aging populations
              pose immense obstacles to family well-being. At FDI, we aim to
              address these challenges head-on by empowering individuals with
              the knowledge and tools to overcome these obstacles and build
              stronger, more resilient families.
            </p>
            <p> </p>
            <p>
              Join us at the Family Development Institute and be part of a
              transformative journey towards unlocking the power of strong
              families. Together, we can create a future where families thrive,
              individuals flourish, and societies prosper.
            </p>
          </div>
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
                  $ 99.99
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
                  USD
                </span>
              </p>

              <div className="text-center w-auto py-5">
                <button
                  type="button"
                  className="cursor-pointer w-auto px-6 py-2 bg-firefly-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-firefly-700 hover:shadow-lg focus:bg-firefly-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-firefly-800 active:shadow-lg transition duration-150 ease-in-out  bg-lime-500 hover:bg-lime-600 uppercase\n                                transition duration-300 ease-in-out text-firefly-900 hover:text-white text-sm font-bold"
                  data-hs-overlay="#hs-subscription-with-image"
                >
                  Start Application: fdi 2025
                </button>
              </div>
              <div>Mar 11 – Mar 16, 2025</div>

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
