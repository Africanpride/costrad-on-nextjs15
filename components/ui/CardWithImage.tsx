import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";

export default function CardWithImage() {
  return (
    <Card className="w-full max-w-sm p-0 gap-2 dark:bg-gray-950 rounded-2xl">
      <Image
        src="/images/culture.jpg"
        alt="Product"
        width={400}
        height={300}
        className="object-cover rounded-t-2xl box-border aspect-square w-full p-2 "
        style={{ aspectRatio: "3/2", objectFit: "cover" }}
      />
      <CardHeader className="grid gap-1 p-4 space-y-2 pb-0">
        <CardTitle className="text-lg">Family Development InstituteFamily Development Institute</CardTitle>
        <CardDescription className="line-clamp-3 ">
          The family as the basic unit of society has far reaching implications
          on individual bent and ultimately on national stability in all
          respects. Social sciences have lost the primacy of the family as the
          building block for life. The Family Development Institute (FDI) is
          dedicated to strengthening families through comprehensive programs on
        </CardDescription>
        <Button className="bg-lime-600 text-background hover:text-foreground hover:bg-lime-500 
        cursor-pointer transition-colors p-2 rounded-xl text-center uppercase text-xs">
          Start Application
        </Button>
      </CardHeader>
      <CardContent className="p-2 pt-0 ">
        <Link
          href="/institutes/family-development-institute"
          className="dark:bg-gray-900 bg-gray-200     flex items-center gap-3 md:p-2 p-2 rounded-2xl w-auto"
        >
          <div className="">
            <Image
              className="w-15 md:w-20 md:h-20"
              src="/images/logos/fdi.png"
              alt="fdi"
              width={600}
              height={600}
            />
          </div>
          <div className="flex-1 flex justify-between items-center gap-2">
            <div>
              <p className="  font-bold lg:text-sm">FDI 2024 Edition</p>
              <p className="text-gray-500 dark:text-white  text-sm">
                Mar 11 – Mar 16
              </p>
            </div>
            <div className=" flex items-center ">
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
                className="lucide lucide-chevron-right-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m10 8 4 4-4 4" />
              </svg>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
