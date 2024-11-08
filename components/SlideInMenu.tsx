'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import MainMenu from './ui/Menu';

export default function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { number: '01', text: 'Welcome', href:'/' },
    { number: '02', text: 'The Book', href:'/the-book' },
    { number: '03', text: 'The Author', href:'/the-author' },
    { number: '04', text: 'Strategic Voting 101', href:'/strategic-voting-101' },
    { number: '05', text: 'Events & Webinars', href:'/events-and-webinar' },
    { number: '06', text: 'contact', href:'/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div onClick={onOpen}>
        <MainMenu />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='full'
        classNames={{
          base: 'bg-zinc-900',
          closeButton: 'hidden',
        }}>
        <ModalContent>
          <ModalBody className='relative flex h-screen w-full flex-col items-center justify-center p-0'>
            {/* Close button */}
            <Button
              isIconOnly
              variant='light'
              onPress={onClose}
              className='absolute right-4 top-4 text-zinc-400 hover:text-white'>
              <X className='h-6 w-6' />
              <span className='sr-only'>Close</span>
            </Button>

            {/* Side text */}
            <div className='absolute left-4 top-1/2 -translate-y-1/2 rotate-180 text-3xl text-yellow-500 [writing-mode:vertical-lr]'>
              The Strategic Voter
            </div>
            <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
              <div className='h-20 w-px bg-zinc-700' />
              <div className='text-lg text-white [writing-mode:vertical-lr]'>
                THE KINGDOM PATTERNS SERIES - Volume 1
              </div>
            </div>

            {/* Menu items */}
            <motion.nav
              className='flex flex-col items-center justify-center gap-4'
              variants={containerVariants}
              initial='hidden'
              animate='visible'>
              {menuItems.map((item) => (
                <motion.div
                  key={item.number}
                  className='group relative flex items-center justify-center'
                  variants={itemVariants}>
                  <span className='absolute -left-8 text-sm text-zinc-600'>
                    {item.number}
                  </span>
                  <a
                    href='#'
                    className='group relative text-4xl font-light text-white sm:text-6xl transition-all duration-300'>
                    {item.text}
                    <span className='absolute -bottom-2 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full' />
                  </a>
                </motion.div>
              ))}
            </motion.nav>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
