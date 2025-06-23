import React, { useState, useEffect } from "react";

import {
  FaGraduationCap,
  FaLaptopCode,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaCertificate,
  FaMedal,
  FaRocket,
  FaCode,
  FaShieldAlt,
  FaComments,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const LMSPage = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    courses: false,
    stats: false,
    testimonials: false,
    cta: false,
  });

  const { user } = useAuth();

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: true,
      courses: true,
      stats: true,
      testimonials: true,
      cta: true,
    });
  }, []);



  const stats = [
    { value: "200+", label: "Active Students" },
    { value: "15+", label: "Expert Courses" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Nikhil Sharma",
      role: "Frontend Developer",
      company: "CodeEternity",
      quote:
        "The learning experience at Code Eternity transformed my career. The courses are structured perfectly for practical learning.",
    },
    {
      id: 2,
      name: "Manish Kumar",
      role: "Full Stack Developer",
      company: "CodeEternity",
      quote:
        "I've tried many online platforms, but Code Eternity's LMS stands out with its interactive exercises and real-world projects.",
    },
    {
      id: 3,
      name: "Sneha Gupta",
      role: "Data Scientist",
      company: "CodeEternity",
      quote:
        "The mentorship and community support at Code Eternity are invaluable. I landed my dream job thanks to their guidance.",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Interactive Learning",
      description:
        "Engage with hands-on exercises, quizzes, and real-world projects",
      icon: <FaLaptopCode className="text-4xl text-blue-500" />,
    },
    {
      id: 2,
      title: "Expert Mentorship",
      description:
        "Get guidance from industry professionals with years of experience",
      icon: <FaUsers className="text-4xl text-blue-500" />,
    },
    {
      id: 3,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and insights",
      icon: <FaChartLine className="text-4xl text-blue-500" />,
    },
    {
      id: 4,
      title: "Flexible Schedule",
      description:
        "Learn at your own pace with on-demand access to all course materials",
      icon: <FaCalendarAlt className="text-4xl text-blue-500" />,
    },
    {
      id: 5,
      title: "Certifications",
      description:
        "Earn industry-recognized certificates upon course completion",
      icon: <FaCertificate className="text-4xl text-blue-500" />,
    },
    {
      id: 6,
      title: "Career Support",
      description:
        "Get placement assistance and career guidance from our network",
      icon: <FaMedal className="text-4xl text-blue-500" />,
    },
  ];
  // New Technology Stack Section Data
  const techStacks = [
    {
      id: 1,
      name: "Frontend Development",
      description: "Build beautiful user interfaces with modern frameworks",
      icon: <FaCode className="text-blue-500 text-3xl" />,
      technologies: ["React", "Vue", "Angular", "Next.js", "Tailwind CSS"],
    },
    {
      id: 2,
      name: "Backend Development",
      description: "Create scalable and efficient server-side applications",
      icon: <FaShieldAlt className="text-purple-500 text-3xl" />,
      technologies: ["Node.js", "Express", "Django", "Spring Boot", "GraphQL"],
    },
    {
      id: 3,
      name: "Mobile Development",
      description: "Develop cross-platform mobile applications",
      icon: <FaMobileAlt className="text-green-500 text-3xl" />,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
    },
  ];

  return (
    <div className="bg-gray-900 pt-32 text-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        className={`relative py-20 px-6 transition-all duration-1000 transform ${
          isVisible.hero
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black opacity-50 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="container mx-auto relative z-10 flex flex-col items-center">
          <div className="flex items-center mb-6 animate-bounce">
            <FaGraduationCap className="text-6xl text-blue-500 mr-4" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Code Eternity LMS
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl text-center mb-8 max-w-3xl">
            Advanced Learning Management System for the Modern Developer
          </h2>

          <p className="text-gray-300 text-lg md:text-xl text-center mb-12 max-w-2xl">
            Transform your coding journey with our cutting-edge learning
            platform designed for aspiring and professional developers alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link to="/whatweoffer">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 ">
                  Explore Courses
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 border-2 border-blue-500 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-500/20 transition-all duration-300">
                  Login to explore more
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-6 bg-gray-900 transition-opacity duration-1000 ${
          isVisible.features ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Platform Features
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive learning management system provides everything
              you need to master coding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 px-6 bg-gray-800 transition-all duration-1000 ${
          isVisible.stats ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-900 border border-gray-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-20 px-6 bg-gray-900 transition-all duration-1000 transform ${
          isVisible.testimonials
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Student Success Stories
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from our community of learners who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden transition-all duration-1000 ${
          isVisible.cta ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Coding Journey?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of developers who have accelerated their careers
              with Code Eternity LMS. Get unlimited access to our premium
              courses, projects, and community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/whatweoffer">
                <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105">
                  View Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-8">
            <FaGraduationCap className="text-3xl text-blue-500 mr-2" />
            <h3 className="text-2xl font-bold">Code Eternity LMS</h3>
          </div>

          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Code Eternity. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LMSPage;
