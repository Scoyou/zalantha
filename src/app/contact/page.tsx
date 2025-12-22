"use client";
import React, { useState, useRef, FormEvent } from "react";
import { BackgroundImage } from "../ui/background-image";
import Layout from "../ui/layout";
import emailjs from "@emailjs/browser";
import { ContactModal } from "../ui/contact-modal";
interface FormData {
  fromName: string;
  fromEmail: string;
  message: string;
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const initialFormData: FormData = {
    fromName: "",
    fromEmail: "",
    message: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (
      form.current &&
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
    ) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
          form.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
          },
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setShowModal(true);
            setFormData(initialFormData);
          },
          (error) => {
            console.log("FAILED...", error.text);
          },
        );
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout variant="dark">
      <BackgroundImage
        imageSrc={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/contact_us_background.webp`}
        altText="Background - a pencil drawing of people on horseback riding away from a castle"
      />
      <div className="items-center text-center">
        <h1 className="text-3xl text-mist">Contact Us</h1>
      </div>
      <p>
        Want to join an event, have questions, or just want to say hi? Fill out
        the form below. We&apos;ll get back to you as soon as we can.
      </p>

      <form ref={form} onSubmit={sendEmail} className="mx-auto max-w-md">
        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Name
          </label>
          <input
            type="text"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Email
          </label>
          <input
            type="email"
            name="fromEmail"
            value={formData.fromEmail}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn-primary text-xs uppercase tracking-[0.3em]"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-mist">
        Or email us directly at heloksrising@zalantha.com
      </p>
      <ContactModal isOpen={showModal} onClose={closeModal} />
    </Layout>
  );
}
