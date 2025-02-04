import Jumbotron from '@/components/ui/Jumbotron';
import MainLogo from '@/components/ui/MainLogo';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import Image from "next/image";

import { Toaster } from 'react-hot-toast';




export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-screen relative">
            <div className='absolute top-5 right-5 z-20 '><ThemeSwitch className='pt-2 pl-6' /></div>
            <div className="sm:flex sm:col-span-2  justify-center items-center hidden relative">
                <Image priority src={'/images/wallpaper.jpg'} alt="alt" width={1000} height={1000}
                    className="inset-0 absolute "
                    style={
                        {
                            width: "100%",
                            height: "100%",
                        }
                    }
                />
                <div className="z-10">
                    <MainLogo textColor="text-white" logoSize="w-[5.7rem] h-[5.7rem]" />
                </div>
            </div>
            <div className='sm:flex sm:col-span-1  justify-center items-center  relative'>
                {children}
            </div>
        </div>

    );
}