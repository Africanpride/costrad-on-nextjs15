"use client";

import { useSession } from "next-auth/react";
import { Avatar } from '@heroui/react';

export default function ClientComponent() {
    const { data: session, status } = useSession();

    const image: string = session?.user?.image ?? ""; // Fallback to empty string if undefined


    // Handle loading state first
    if (status != "authenticated") return <div>Loading...</div>;

    
    return (
        <div>
            <h1>Welcome, {session?.user?.name}</h1>
            <p>Email: {session?.user?.email}</p>
            <Avatar
                src={image}
                className="w-[5.4rem] h-[5.4rem] text-large bg-purple-800"
            />
         <div>
         <pre className="whitespace-pre-wrap break-all px-4 py-6">
          {JSON.stringify(session, null, 2)}
        </pre>
         </div>
        </div>
    );
}