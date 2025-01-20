'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import MainMenu from './ui/Menu';
import { siteConfig } from '@/config/site';
import { bebas } from '@/config/fonts';
import { useRouter } from 'next/navigation';
import { ThemeSwitch } from './ui/theme-switch';

export default function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    onClose();
    router.push(href);
  };

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
      <div className='flex items-center justify-end gap-x-4 '>
        <div className="pt-2">
          <ThemeSwitch />
        </div>
        <div className={`${bebas.className}`} onClick={onOpen}>
          <MainMenu />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size='full'
          classNames={{
            base: 'fixed inset-0 dark:bg-black bg-white',
            closeButton: 'hidden',
          }}>
          <ModalContent className={`  `}>
            <ModalBody className='relative flex h-screen w-full flex-col items-center justify-center p-0'>


              <div className='absolute left-4 top-4 z-50'>
                <ThemeSwitch />
              </div>
              
              <div className='absolute right-4 top-4'>
                <div className='flex justify-end items-center gap-x-4 w-full '>
                  <span className='uppercase text-xs cursor-pointer  ' onClick={onClose}>Close</span>
                  <Button
                    isIconOnly
                    variant='light'
                    onPress={onClose}
                    className=' text-zinc-400 hover:text-white'>
                    <span><X className='h-6 w-6' /></span>
                    <span className='sr-only'>Close</span>
                  </Button>
                </div>
              </div>

              <div className=' h-dvh absolute left-5 top-1/2 -translate-y-1/2
               rotate-180 text-xs text-yellow-500 [writing-mode:vertical-lr] text-center
               '>
                <span className='uppercase font-bold '>{siteConfig.name}</span>
              </div>
              <div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
                <div className='h-20 w-px bg-purple-700' />
                <div className='text-lg text-purple-500 [writing-mode:vertical-lr]'>
                  {siteConfig.shortName}
                </div>
              </div>

              <motion.nav
                className='flex flex-col items-start justify-center gap-4'
                variants={containerVariants}
                initial='hidden'
                animate='visible'>
                {siteConfig.navItems.map((item) => (
                  <motion.div
                    key={item.number}
                    className='group relative flex items-start justify-center'
                    variants={itemVariants}>
                    <span className='absolute -left-8 text-xs text-purple-400'>
                      {item.number}
                    </span>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className='group relative text-3xl font-light sm:text-4xl transition-all duration-300'>
                      {item.label}
                      <span className='absolute -bottom-2 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full' />
                    </button>
                  </motion.div>
                ))}
              </motion.nav>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
