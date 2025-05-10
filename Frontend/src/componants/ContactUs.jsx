"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import animationData from '../data/contactPage.json';
import img7 from "../assets/img7.svg"; // Import your SVG as an image

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <section className="relative bg-[#c4b1f9] flex flex-col mt-28 pb-10 md:flex-row min-h-screen overflow-hidden">
        {/* SVG Background */}
        <img
          src={img7}
          alt="Background"
          className="absolute top-0 left-140 w-full h-full object-cover z-0"
          style={{ minHeight: "100vh" }}
        />

        {/* Left animation and text */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center">
          <Lottie animationData={animationData} loop className="w-full max-w-md" />
          <div className="mt-6 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Got questions or ideas? <br />
              <span className="bg-white px-2 inline-block mt-2">Reach out</span> — we'd love to hear from you!
            </h1>
            <p className="text-base md:text-lg text-gray-700 mt-4">
              Made for curious minds and creative teams everywhere.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 px-5 py-2 border border-gray-800 rounded-md text-gray-900 font-medium hover:bg-gray-100 transition">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right form */}
        <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Let's Talk</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Have a question, suggestion, or just want to say hi? Fill out the form and we'll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-3 rounded-md transition duration-300"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
