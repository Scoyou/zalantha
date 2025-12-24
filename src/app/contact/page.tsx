"use client";
import React, { useState, useRef, FormEvent } from "react";
import Layout from "../ui/layout-panel";
import emailjs from "@emailjs/browser";
import { ContactModal } from "../ui/contact-modal";
import Reveal from "../ui/reveal";
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
    <Layout variant="dark" className="themed-panel lore-panel">
      <Reveal>
        <div className="items-center text-center">
          <h1 className="heading-sigil text-3xl text-mist">Contact Us</h1>
          <div className="section-divider"></div>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="reading-flow">
          Want to join an event, have questions, or just want to say hi? Fill out
          the form below. We&apos;ll get back to you as soon as we can.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <form ref={form} onSubmit={sendEmail} className="mx-auto w-full md:max-w-md">
          <div className="mb-4">
            <label
              htmlFor="fromName"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist"
            >
              Name of Adventurer
            </label>
            <input
              type="text"
              id="fromName"
              name="fromName"
              value={formData.fromName}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="fromEmail"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist"
            >
              Raven Address
            </label>
            <input
              type="email"
              id="fromEmail"
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist"
            >
              Your Message
            </label>
            <textarea
              id="message"
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
              className="btn-primary btn-primary--shimmer text-xs uppercase tracking-[0.3em]"
            >
              Send via Raven
            </button>
          </div>
        </form>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-center text-sm text-mist">
          Or email us directly at heloksrising@zalantha.com
        </p>
      </Reveal>
      <ContactModal isOpen={showModal} onClose={closeModal} />
    </Layout>
  );
}
