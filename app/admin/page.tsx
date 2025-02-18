'use client';
import { bebas } from '@/config/fonts';
import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { request } from 'http';

type ContactFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

type Session = typeof auth.$Infer.Session;


export default function AdminPage() {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    if (!isSelected) {
      toast.error('Please agree to the privacy policy');
      return;
    }

    const formData = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      message: data.message,
    };

    await toast.promise(
      (async () => {
        const response = await fetch('/api/talk-to-us', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const result = await response.json();
        // console.log('Success:', result);

        reset();
        setIsSelected(false);

        return result;
      })(),
      {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: 'Failed to send message',
      }
    );
  };

  useEffect(() => {
    async function getUser() {
      const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
        baseURL: window.location.origin,
        headers: {
          cookie: document.cookie || "", // Forward the cookies from the browser
        },
      });

      console.log("SESSION DATA: ", session);

    }
    getUser();
  }, []);

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-[70rem] px-4">
        <div className="mb-14">
          <span className="text-sm font-semibold">Reach Us</span>
          <h1 className={`mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl ${bebas.className}`}>
            Speak with Our Friendly Team
          </h1>
          <p className="text-lg text-muted-foreground">
            We'd love to assist you. Fill out the form or drop us an email.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 ">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
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
                className="lucide lucide-mail mb-3 h-6 w-auto"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <h1 className={`mb-2 text-lg font-semibold ${bebas.className}`}>Email Us</h1>
              <p className="mb-3 text-muted-foreground">
                Our team is ready to assist.
              </p>
              <a href="#" className="font-semibold hover:underline">
                info@TheStrategicVoter.com
              </a>
            </div>
            <div>
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
                className="lucide lucide-messages-square mb-3 h-6 w-auto"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <h1 className={`mb-2 text-lg font-semibold ${bebas.className}`}>Live Chat Support</h1>
              <p className="mb-3 text-muted-foreground">
                Reach out for quick help.
              </p>
              <a href="#" className="font-semibold hover:underline">
                Start a new chat
              </a>
            </div>
            <div>
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
                className="lucide lucide-map-pin mb-3 h-6 w-auto"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h1 className={`mb-2 text-xl   `}>Visit Us</h1>
              <p className="mb-3 text-muted-foreground">
                Drop by our office for a chat.
              </p>
              <a href="#" className="font-semibold hover:underline">
                Logos-Rhema Foundation, Behind Trade Fair, La. Accra.
              </a>
            </div>
            <div>
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
                className="lucide lucide-phone mb-3 h-6 w-auto"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <h1 className={`mb-2 text-lg font-semibold ${bebas.className}`}>Call Us</h1>
              <p className="mb-3 text-muted-foreground">
                Mon-Fri, 9am-5pm GMT.
              </p>
              <a href="#" className="font-semibold hover:underline">
                +233200201334
              </a>
            </div>
          </div>

          <div className='mx-auto container flex w-full flex-col gap-6 md:rounded-lg 
          md:max-w-auto  p-4 md:p-10'>
            <form onSubmit={handleSubmit(onSubmit)} className=' space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                  variant='underlined'
                  labelPlacement='inside'
                  label='First Name'
                  autoFocus
                  {...register('firstname', { required: true })}
                  name='firstname'
                  // placeholder="Enter your First Name"
                  className='md:max-w-auto]'
                  isInvalid={errors.firstname ? true : false}
                  isClearable
                  color='success'
                />

                <Input
                  variant='underlined'
                  {...register('lastname', { required: true })}
                  name='lastname'
                  label='Last Name'
                  // placeholder="Enter your Last Name"
                  className='md:max-w-auto]'
                  isInvalid={errors.lastname ? true : false}
                  isClearable
                  color='success'
                />
              </div>

              <div className='w-full'>
                <Input
                  variant='underlined'
                  {...register('email', { required: true })}
                  label='Your Email Address'
                  name='email'
                  type='email'
                  aria-label='Email Address'
                  className='md:max-w-auto]'
                  isInvalid={errors.email ? true : false}
                  isClearable
                  color='success'
                />
              </div>

              <div className='grid w-full gap-1.5 md:col-span-2'>
                <Textarea
                  // isClearable
                  className="max-w-full"
                  label='Message '

                  placeholder="Your Message"
                  variant="underlined"
                  // eslint-disable-next-line no-console
                  color={errors.message ? 'danger' : 'success'}
                  onClear={() => console.log("textarea cleared")}
                  {...register('message', { required: 'Message is required' })}
                />
                {/* <Textarea
                  variant={'underlined'}
                  label='Message'
                  labelPlacement='inside'
                  placeholder={errors.message ? errors.message.message : 'Enter your message'}
                  className='col-span-12 md:col-span-6 mb-6 md:mb-0'
                /> */}
                {/* <textarea
                  {...register('message', { required: 'Message is required' })}
                  className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  placeholder='How can we help you?'
                /> */}
                {errors.message && (
                  <span className='text-sm text-red-500'>
                    {errors.message.message}
                  </span>
                )}
              </div>

              <div className='flex items-center space-x-2 md:col-span-2'>
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium md:leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    I agree to the
                    <Link href={'/privacy'}>
                      <span className='ml-1 underline'>privacy policy</span>
                    </Link>
                  </label>
                </Checkbox>
              </div>

              <Button
                isDisabled={!isSelected}
                type='submit'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:col-span-2'>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
