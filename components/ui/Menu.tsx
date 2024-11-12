import { LucideAlignLeft } from "lucide-react";
import React from "react";
import { ThemeSwitch } from "./theme-switch";

type Props = {};

export default function MainMenu(props: Props) {
  return (
    <div className="relative flex items-center gap-2 group cursor-pointer ">
    <div className="py-1 bg-neutral-900 shadow-sm flex items-center gap-x-4 group-hover:gap-x-6 rounded-full p-1 pl-4 transition-all duration-300">
      <span className="text-[1.2em] text-white pt-1">Menu</span>
      <span className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
        <LucideAlignLeft className="text-gray-900 w-6 h-6 p-1" />
      </span>
    </div>
    <div className="pt-2">
      <ThemeSwitch />
    </div>
  </div>
  
  );
}
