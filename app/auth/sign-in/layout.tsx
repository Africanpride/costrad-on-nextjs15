import Jumbotron from '@/components/ui/Jumbotron';
import MainLogo from '@/components/ui/MainLogo';
import Image from "next/image";

import { Toaster } from 'react-hot-toast';




export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-screen">
            <div className="sm:flex sm:col-span-2  justify-center items-center hidden relative">
                <Image src={'/images/wallpaper.jpg'} alt="alt" width={1000} height={1000}
                    className="inset-0 absolute "
                    style={
                        {
                            width: "100%",
                            height: "100%",
                        }
                    }
                />
                <div className="z-10"><MainLogo textColor="text-white" logoSize="w-[5.7rem] h-[5.7rem]" /></div>
            </div>
123456
            {children}
        </div>

    );
}