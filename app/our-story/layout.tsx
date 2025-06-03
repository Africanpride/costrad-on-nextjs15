import GoogleCaptchaWrapper from '@/components/ui/GoogleCaptchaWrapper';
import Jumbotron from '@/components/ui/Jumbotron';
import { Toaster } from 'react-hot-toast';




export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section className='block'>
          <Toaster />
          <Jumbotron />
         <div className='p-4 '>
         {children}
         </div>
      </section>

  );
}
