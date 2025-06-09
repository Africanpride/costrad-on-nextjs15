"use client";
import { bebas } from "@/config/fonts";
import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { request } from "http";
import Jumbotron from "@/components/ui/Jumbotron";
import { Testimonials } from "../../components/Testimonials";
import Image from "next/image";

type ContactFormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

type Session = typeof auth.$Infer.Session;

export default function ContactPage() {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    if (!isSelected) {
      toast.error("Please agree to the privacy policy");
      return;
    }

    const formData = {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      message: data.message,
    };

    await toast.promise(
      (async () => {
        const response = await fetch("/api/talk-to-us", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const result = await response.json();
        // console.log('Success:', result);

        reset();
        setIsSelected(false);

        return result;
      })(),
      {
        loading: "Sending message...",
        success: "Message sent successfully!",
        error: "Failed to send message",
      }
    );
  };

  useEffect(() => {
    async function getUser() {
      const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
          baseURL: window.location.origin,
          headers: {
            cookie: document.cookie || "", // Forward the cookies from the browser
          },
        }
      );

      console.log("SESSION DATA: ", session);
    }
    getUser();
  }, []);

  return (
    <div className="py-8 space-y-8">
      <section className="container">
        <div className="container">
          <div className="max-w-3xl space-y-3">
            <h1 className="mb-3 text-xl font-medium text-firefly">
              Contact us
            </h1>
            <h2 className="text-4xl  text-balance md:text-5xl">
              Get in touch with us today to learn more
            </h2>
            <p className="text-2xl">
              We’d love to hear from you! Reach out to our team today to
              discover more about <span className="font-">COSTrAD</span>, ask
              questions, or get the information you need. Don’t hesitate to
              contact us — we’re here to help and look forward to connecting
              with you.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Testimonials
                </h2>
                <p className="text-foreground">
                  Whether it’s the impact it has had on your personal
                  development, professional growth, or leadership
                  transformation, we’d love to hear your story and how COSTrAD
                  has influenced your perspective and aspirations.
                </p>
              </div>
              <a href="#" className="hover:underline">
                Submit Testimonial
              </a>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Support
                </h2>
                <p className="text-foreground">
                  Our team is always ready to support you with any questions or
                  challenges you may encounter while using the platform. Whether
                  you're navigating a new feature, troubleshooting an issue, or
                  simply curious about how something works, we're here to guide
                  you.
                </p>
              </div>
              <a href="#" className="hover:underline">
                Get support
              </a>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">
                  Feedback
                </h2>
                <p className="text-foreground">
                  We would truly appreciate hearing your thoughts, suggestions,
                  and insights on how we can enhance and elevate our overall web
                  presence.
                </p>
              </div>
              <a href="#" className="hover:underline">
                Submit Feedback
              </a>
            </div>
          </div>
          <div className="mt-7">
            <Jumbotron
              className=""
              heroImage="map.jpg"
              height="md:h-[550px] h-dvh rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3">
          <a
            href="#"
            className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
          >
            <h3 className="mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl false">
              Communication
            </h3>
            <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle-more size-10 text-primary/90 md:size-12"
                  aria-hidden="true"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-5 h-fit text-primary/80 transition-all false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="#"
            className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
          >
            <h3 className="mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl false">
              Integrations
            </h3>
            <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-blocks size-10 text-primary/90 md:size-12"
                  aria-hidden="true"
                >
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-5 h-fit text-primary/80 transition-all false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="#"
            className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
          >
            <h3 className="mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl false">
              Collaboration
            </h3>
            <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users size-10 text-primary/90 md:size-12"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-5 h-fit text-primary/80 transition-all false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="#"
            className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
          >
            <h3 className="mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl false">
              Customization
            </h3>
            <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-panel-top size-10 text-primary/90 md:size-12"
                  aria-hidden="true"
                >
                  <rect width="18" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-5 h-fit text-primary/80 transition-all false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="#"
            className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
          >
            <h3 className="mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl false">
              Security
            </h3>
            <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="mt-auto flex items-end justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-fingerprint size-10 text-primary/90 md:size-12"
                  aria-hidden="true"
                >
                  <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                  <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                  <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                  <path d="M2 12a10 10 0 0 1 18-6" />
                  <path d="M2 16h.01" />
                  <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                  <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                  <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                  <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right size-5 h-fit text-primary/80 transition-all false"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </a>
          <div className="flex w-full grow flex-col gap-6 rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2 lg:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center relative">
              <h3 className="max-w-[85%] text-xl font-bold tracking-tight md:max-w-[60%] lg:text-3xl">
                Powerful Features
              </h3>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4 w-full sm:w-auto"
              >
                Get Started
              </button>
              <Image
                src="/images/center.jpg"
                alt="placeholder"
                width={800}
                height={600}
                className="aspect-square absolute inset-0 h-full w-full rounded-lg object-cover md:aspect-[3]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
