import { title } from '@/components/primitives';
import Introduction from '@/components/ui/Introduction';
import { bebas } from '@/config/fonts';

export default function ContacttPage() {
  return (
    <section className='py-32'>
      <div className='container mx-auto'>
        <div className='mb-14'>
          <span className='text-sm font-semibold'>Reach Us</span>
          <h1 className='mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl'>
            Speak with Our Friendly Team
          </h1>
          <p className='text-lg text-muted-foreground'>
            We'd love to assist you. Fill out the form or drop us an email.
          </p>
        </div>
        <div className='grid gap-10 md:grid-cols-2 divide-y-1 '>
          <div className='grid gap-10 sm:grid-cols-2 '>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-mail mb-3 h-6 w-auto'>
                <rect width='20' height='16' x='2' y='4' rx='2' />
                <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
              </svg>
              <p className='mb-2 text-lg font-semibold'>Email Us</p>
              <p className='mb-3 text-muted-foreground'>
                Our team is ready to assist.
              </p>
              <a href='#' className='font-semibold hover:underline'>
                info@TheStrategicVoter.com
              </a>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-messages-square mb-3 h-6 w-auto'>
                <path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z' />
                <path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1' />
              </svg>
              <p className='mb-2 text-lg font-semibold'>Live Chat Support</p>
              <p className='mb-3 text-muted-foreground'>
                Reach out for quick help.
              </p>
              <a href='#' className='font-semibold hover:underline'>
                Start a new chat
              </a>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-map-pin mb-3 h-6 w-auto'>
                <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
                <circle cx='12' cy='10' r='3' />
              </svg>
              <p className='mb-2 text-lg font-semibold'>Visit Us</p>
              <p className='mb-3 text-muted-foreground'>
                Drop by our office for a chat.
              </p>
              <a href='#' className='font-semibold hover:underline'>
                Logos-Rhema Foundation, Behind Trade Fair, La. Accra.
              </a>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-phone mb-3 h-6 w-auto'>
                <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
              </svg>
              <p className='mb-2 text-lg font-semibold'>Call Us</p>
              <p className='mb-3 text-muted-foreground'>
                Mon-Fri, 9am-5pm GMT.
              </p>
              <a href='#' className='font-semibold hover:underline'>
			  +233200201334
              </a>
            </div>
          </div>
          <div className='mx-auto flex w-full flex-col gap-6 rounded-lg md:max-w-auto bg-muted p-10'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='grid w-full items-center gap-1.5'>
                <label
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  htmlFor='firstname'>
                  First Name<sup className='ml-0.5'>*</sup>
                </label>
                <input
                  type='text'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  id='firstname'
                  placeholder='Your First Name'
                />
              </div>
              <div className='grid w-full items-center gap-1.5'>
                <label
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  htmlFor='lastname'>
                  Last Name<sup className='ml-0.5'>*</sup>
                </label>
                <input
                  type='text'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  id='lastname'
                  placeholder='Your Last Name'
                />
              </div>
            </div>
            <div className='grid w-full items-center gap-1.5'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='email'>
                Email Address<sup className='ml-0.5'>*</sup>
              </label>
              <input
                type='email'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                id='email'
                placeholder='Your Email'
              />
            </div>
            <div className='grid w-full gap-1.5'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='message'>
                Your Message<sup className='ml-0.5'>*</sup>
              </label>
              <textarea
                className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                placeholder='How can we help you?'
                id='message'
              />
            </div>
            <div className='flex items-center space-x-2'>
              <button
                type='button'
                role='checkbox'
                aria-checked='false'
                data-state='unchecked'
                value='on'
                className='peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                id='terms'
              />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                I agree to the
                <span className='ml-1 underline'>privacy policy</span>
              </label>
            </div>
            <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
