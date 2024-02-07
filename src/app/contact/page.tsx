"use client";
import React, { useState } from "react";
import { BackgroundImage } from "../ui/background-image";
import Layout from "../ui/layout";

interface FormData {
  fromName: string;
  fromEmail: string;
  message: string;
}

export default function Contact() {
  const initialFormData: FormData = {
    fromName: "",
    fromEmail: "",
    message: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <Layout>
      <BackgroundImage
        imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/contact_us_background.webp"
        altText="Background - a pencil drawing of people on horseback riding away from a castle"
      />
      <div className="items-center text-center">
        <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
      </div>
      <p>
        Want to join an event, have questions, or just want to say hi? Fill out
        the form below. We&apos;ll get back to you as soon as we can.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.fromName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.fromEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-amber-200"
          >
            Submit
          </button>
        </div>
      </form>
      <p>Or email us directly at heloksrising@zalantha.com</p>
    </Layout>
  );
}
