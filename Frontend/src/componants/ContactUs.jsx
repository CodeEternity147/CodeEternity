"use client";

import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import animationData from '../data/contactPage.json';
import img7 from "../assets/img7.svg"; // Import your SVG as an image
import data from '../data/data.json';

export default function ContactUs() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    parentCategory: "", 
    childCourse: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'parentCategory') {
      // Reset child course when parent changes
      setFormData({ ...formData, [name]: value, childCourse: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      toast.success(response.data.message);
      setFormData({ name: "", email: "", parentCategory: "", childCourse: "", message: "" });
    } catch (error) { 
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    } finally {
      setSubmitted(false);
    }
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
            Got doubts about this placement/internship  <br />
              <span className="bg-white px-2 inline-block mt-2"> program?</span> — Ask us directly.
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
          <div className="bg-white rounded-3xl p-4 mt-1 md:p-8 shadow-2xl w-full max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Raise your query</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Have a question, suggestion, or just doubt about our services? Fill out the form and we'll get back to you soon.
            </p>
            <p className="text-gray-500 mb-6 text-sm">
              Alternatively, you can email our HR department at <a href="mailto:hr@codeeternity.com" className="text-indigo-600 hover:underline">hr@codeeternity.com</a>.
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

              <div>
                <label htmlFor="parentCategory" className="block text-gray-700 font-medium mb-2">
                  Choose Category
                </label>
                <select
                  id="parentCategory"
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select a category</option>
                  {data.whatWeOffer.map((category, index) => (
                    <option key={index} value={category.key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="childCourse" className="block text-gray-700 font-medium mb-2">
                  Choose Course
                </label>
                <select
                  id="childCourse"
                  name="childCourse"
                  value={formData.childCourse}
                  onChange={handleChange}
                  required
                  disabled={!formData.parentCategory}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select a course</option>
                  {formData.parentCategory && 
                    data.whatWeOffer
                      .find(category => category.key === formData.parentCategory)
                      ?.childCourses.map((course, index) => (
                        <option key={index} value={course.key}>
                          {course.name}
                        </option>
                      ))
                  }
                </select>
              </div>

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
