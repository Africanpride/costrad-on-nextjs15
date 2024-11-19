import { bebas } from '@/config/fonts';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  XIcon,
} from 'react-share';
import { shareSocial } from '@/config/site';

type Props = {};

const CTA = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <section className={` bg-neutral-200 dark:bg-gray-800 `}>
      <div className=' flex flex-col md:flex-row  justify-center md:flex md:items-center md:justify-between 
      min-h-[500px]  w-full mx-auto py-12 px-4 sm:px-6 md:py-16 md:px-8 z-20'>
        <h2 className={` text-black dark:text-white sm:text-4xl max-w-3xl`}>
          <div
            className={`${bebas.className} font-display text-4xl tracking-tighter text-accent-background sm:text-5xl`}>
            Be Empowered to Decide!
          </div>
          <div className='mt-4 text-lg tracking-tight text-neutral-900 '>
            Share the power of strategic voting! Encourage others to make
            informed decisions that makes impact. Spread the word, inspire
            action, and empower voters everywhere today.
          </div>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 md:pt-0 '>
          <div className=' inline-flex rounded-md shadow'>
            <button
              type='button'
              className='py-4 px-6  bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-500 focus:ring-offset-neutral-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
              Grab Your Copy
            </button>
          </div>
          <div className='inline-flex rounded-md shadow'>
            <button
              onClick={onOpen}
              type='button'
              className='py-4 px-6  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
              Share With Friends
            </button>
          </div>
        </div>
      </div>

      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Share with Others
                </ModalHeader>
                <ModalBody>
                  <div className='flex items-center justify-start gap-4'>
                    <WhatsappShareButton
                      url={shareSocial.url}
                      title={shareSocial.title}
                      separator=':: '
                      className=''>
                      <Button
                        radius='full'
                        className='pr-1'
                        endContent={<WhatsappIcon size={32} round />}>
                        {' '}
                        WhatsApp
                      </Button>
                    </WhatsappShareButton>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='success' variant='ghost' onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </section>
  );
};

export default CTA;
