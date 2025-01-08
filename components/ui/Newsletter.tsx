import { bebas } from '@/config/fonts';
import { Button, Input, Link } from '@nextui-org/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type NewsletterFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
};


const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormInputs>();

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {

    const formData = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
    };

    console.log('formData:', formData);

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
        console.log('Success:', result);

        reset();

        return result;
      })(),
      {
        loading: 'Subscribing for future updates ...',
        success: 'Subscribed successfully!',
        error: 'Failed to subscribe',
      }
    );
  };



  return (
    <section id='newsletter' aria-label='Newsletter' className=' md:p-16 h-auto md:h-dvh  flex flex-col justify-center items-center'>
      <div className='mx-auto md:max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative -mx-4 overflow-hidden  px-4 py-20 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-5xl md:px-16 xl:px-24 xl:py-36'>

          <div className='relative mx-auto grid md:max-w-2xl grid-cols-1 gap-x-32 gap-y-14 xl:max-w-none xl:grid-cols-2'>
            <div>
              <p className={`${bebas.className} font-display text-4xl font-medium tracking-tighter  sm:text-5xl`}>
                Stay up to date
              </p>
              <p className='mt-4 text-lg tracking-tight '>
                Get updates on all of our events and be the first to get
                notified.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2' >

              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <Input
                  variant='flat'
                  autoFocus
                  {...register('firstname', { required: true })}
                  name='firstname'
                  label='First Name'
                  // placeholder="Enter your First Name"
                  className='md:max-w-auto]'
                  isInvalid={errors.firstname ? true : false}
                  isClearable
                  color='success'
                />

                <Input
                  variant='flat'
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
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>

                <Input
                  variant='flat'
                  {...register('email', { required: true })}
                  name='email'
                  label='Email Address'
                  // placeholder="Enter your Last Name"
                  className='md:max-w-auto] md:col-span-2'
                  isInvalid={errors.email ? true : false}
                  isClearable
                  color='success'
                />
                <Button
                  type='submit'
                  variant="solid"
                  color='success'
                  className='px-6 py-6 font-semibold rounded-xl  text-white col-span-2 '>
                  Sign up for Updates
                </Button>
              </div>


            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
