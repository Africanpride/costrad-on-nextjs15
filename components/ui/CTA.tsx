import { bebas } from "@/config/fonts";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";

type Props = {};

const CTA = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <section className="p-4 sm:p-16">
      <div className="container">
        <div className="grid grid-cols-3 md:h-[50dvh]  w-full flex-col gap-16 overflow-hidden rounded-xl bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">

          <div className="col-span-full md:col-span-2 ">
            <h1 className="mb-3 text-3xl sm:text-5xl  md:mb-4 md:text-4xl lg:mb-6">
              Stay Ahead of the Curve
            </h1>
            <p className="text-muted-foreground lg:text-lg">
              Be the first to know about our exciting events—get important
              updates, notifications, and announcements delivered straight to
              you.
            </p>
          </div>
          <div className="col-span-full md:col-span-1 ">
            <div className="flex flex-col justify-center  gap-2 ">
              <Label htmlFor="email">Email Address</Label>
              <Input type="email" id="email" placeholder="Email" className="bg-card rounded-none" />

              <Button
                variant="solid"
                type="submit"
                className="w-full cursor-pointer text-current bg-primary "
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Login to your account"
                )}
              </Button>
            </div>
            <p className="mt-2 text-left text-xs text-muted-foreground">
              View our{/* */}{" "}
              <a href="#" className="underline hover:text-foreground">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
