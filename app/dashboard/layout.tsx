import { auth } from '@/auth';
import GoogleCaptchaWrapper from '@/components/ui/GoogleCaptchaWrapper';
import Jumbotron from '@/components/ui/Jumbotron';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';




export default async function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth();
  return (
      <SessionProvider session={session}>
        <div>123456</div>
          <Toaster />
          {/* <Jumbotron /> */}
         <div className='p-5'>
         {children}
         </div>
      </SessionProvider>

  );
}
