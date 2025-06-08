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
    <section className="py-32">
      <div className="container">
        <div className="max-w-3xl space-y-3">
          <h1 className="mb-3 text-xl font-medium text-firefly">Contact us</h1>
          <h2 className="text-4xl  text-balance md:text-5xl">
            Get in touch with us today to learn more
          </h2>
          <p className="text-2xl">
            We’d love to hear from you! Reach out to our team today to discover
            more about <span className="font-">COSTrAD</span>, ask questions, or
            get the information you need. Don’t hesitate to contact us — we’re
            here to help and look forward to connecting with you.
          </p>
        </div>
        <div className="mt-4 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-2xl">
                Testimonials
              </h2>
              <p className="text-foreground">
                Whether it’s the impact it has had on your personal development,
                professional growth, or leadership transformation, we’d love to
                hear your story and how COSTrAD has influenced your perspective
                and aspirations.
              </p>
            </div>
            <a href="#" className="hover:underline">
              Submit Testimonial
            </a>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-lg border p-6">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-2xl">Support</h2>
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
              <h2 className="mb-4 text-xl font-medium md:text-2xl">Feedback</h2>
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
  );
}
