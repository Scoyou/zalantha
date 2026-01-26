"use client";
import React, { useState, useRef, FormEvent } from "react";
import Script from "next/script";
import Layout from "../ui/layout-panel";
import { ContactModal } from "../ui/contact-modal";
import Reveal from "../ui/reveal";
interface FormData {
  fromName: string;
  fromEmail: string;
  message: string;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const recaptchaTokenRef = useRef<HTMLInputElement>(null);

  const initialFormData: FormData = {
    fromName: "",
    fromEmail: "",
    message: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getRecaptchaToken = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) {
      return "";
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha?.execute(siteKey, {
            action: "contact",
          });
          resolve(token ?? "");
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setEmailError(null);

    const trimmedEmail = formData.fromEmail.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailOk) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getRecaptchaToken();
      if (!token) {
        setSubmitError("reCAPTCHA failed to load. Please refresh and try again.");
        return;
      }
      if (recaptchaTokenRef.current) {
        recaptchaTokenRef.current.value = token;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromName: formData.fromName.trim(),
          fromEmail: trimmedEmail,
          message: formData.message.trim(),
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(
          typeof payload?.message === "string"
            ? payload.message
            : "Unable to send your message.",
        );
      }

      setShowModal(true);
      setFormData(initialFormData);
      if (recaptchaTokenRef.current) {
        recaptchaTokenRef.current.value = "";
      }
    } catch (error) {
      console.log("FAILED...", error);
      setSubmitError("Something went wrong sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout variant="dark" className="themed-panel lore-panel">
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}
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
          <input ref={recaptchaTokenRef} type="hidden" name="recaptchaToken" />
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
              Email Address
            </label>
            <input
              type="email"
              id="fromEmail"
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
              autoComplete="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
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

          {emailError ? (
            <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-amber-200">
              {emailError}
            </p>
          ) : null}
          {submitError ? (
            <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-red-400">
              {submitError}
            </p>
          ) : null}
          <div className="text-center">
            <button
              type="submit"
              className="btn-primary btn-primary--shimmer text-xs uppercase tracking-[0.3em]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Summoning Raven..." : "Send via Raven"}
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
