"use client"
import React, { useState } from "react";
import { BackgroundImage } from "../ui/background-image";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const initialFormData: FormData = {
    name: "",
    email: "",
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
    <div className="flex flex-col p-4 bg-gray-900 bg-opacity-80 min-h-screen">
      <BackgroundImage
        imageSrc="https://d1ta48eu7x3n0t.cloudfront.net/contact_us_background.webp"
        altText="Background - a pencil drawing of people on horseback riding away from a castle"
      />
      <div className="flex items-center justify-center min-h-screen z-10">
        <div className="flex flex-col items-center justify-center shadow-lg bg-amber-100 border border-amber-600 w-full md:w-3/4 p-4 space-y-4">
          <div className="items-center text-center">
            <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
          </div>
          <p>
            Want to join an event, have questions, or just want to say hi? Fill
            out the form below. We'll get back to you as soon as we can.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                value={formData.email}
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
        </div>
      </div>
    </div>
  );
}
