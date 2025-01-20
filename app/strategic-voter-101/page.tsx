import Faqs from "@/components/ui/Faqs";
import Introduction from "@/components/ui/Introduction";
import { bebas } from "@/config/fonts";
import { Divider } from "@heroui/react";
import Link from "next/link";

export default function FaqsPage() {
  return (

    <div className=' container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 min-h-screen 
        h-auto space-y-3 p-5 md:p-12 gap-4 md:gap-8 '>

      <div className="col-span-1  space-y-3">
        <div className={`${bebas.className} text-7xl pt-4`}>FAQS</div>
        <Divider className='my-4 w-1/5 bg-red-500 h-1 ' />
        <p className="">Explore answers to the most commonly asked questions to help you better understand key details, common concerns, and insights about <Link href={'/'} className="text-red-500 font-bold">The Strategic Voter</Link></p>
      </div>
      <div className="col-span-1 md:col-span-2">  <Faqs /></div>
    </div>
  );
}
