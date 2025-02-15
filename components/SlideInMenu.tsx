'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Avatar,
  DropdownMenu,
  DrawerBody,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Divider,
} from "@heroui/react";

import { LogOut, UserIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';
import MainMenu from './ui/Menu';
import { siteConfig } from '@/config/site';
import { bebas } from '@/config/fonts';
import { useRouter } from 'next/navigation';
import { ThemeSwitch } from './ui/theme-switch';
import { client, signOut } from '@/lib/auth-client';
import { AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuShortcut } from './ui/dropdown-menu';
import { SignInButton } from './ui/auth/signin-button';

export default function Component() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isSignOut, setIsSignOut] = useState<boolean>(false);


  const router = useRouter();

  const {
    data: session,
    isPending, //loading state
    error //error object
  } = client.useSession()

  if (isPending) {
    return null
  }


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
      <div className='flex items-center justify-end gap-x-2 '>
        <div className={`${bebas.className}  `} onClick={onOpen}>
          <MainMenu />
        </div>

        <div>
          <Drawer isOpen={isOpen} size={'xs'} onClose={onClose} className='rounded-none' >
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex flex-col gap-1">{siteConfig.shortName}</DrawerHeader>
                  <DrawerBody className='flex flex-col justify-center gap-2'>
                    <div className='space-y-4 '>
                      <div className='pb-5'>
                        <SignInButton />
                      </div>
                      <motion.nav
                        className='flex flex-col items-start justify-center gap-4 pl-8 '
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
                    </div>
                  </DrawerBody>
                  <DrawerFooter className='flex items-center justify-between'>
                    <Button color="primary" onPress={onClose}>
                      Close
                    </Button>
                    <ThemeSwitch />
                  </DrawerFooter>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>

      </div>
    </>
  );
}
