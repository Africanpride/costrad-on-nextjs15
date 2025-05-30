/* eslint-disable @next/next/no-img-element */
import { title } from "@/components/primitives";

export default function Privacy() {
  return (
    <>
      <div className="mb-12 flex flex-col items-center justify-center gap-4">
        <span
          data-slot="badge"
          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground rounded-full px-3 py-1.5 text-sm shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles size-4"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
          Visual Theme Editor
        </span>
        <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Shadcn Theme Editor
        </h1>
        <p className="text-muted-foreground max-w-[800px] text-center">
          Preview your theme changes across different components and layouts.
        </p>
      </div>
    </>
  );
}
