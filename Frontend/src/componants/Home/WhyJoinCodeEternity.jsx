import React from "react";
import img3 from "../../assets/img3.svg";
import img4 from "../../assets/img4.svg";
import { Link } from 'react-router-dom';

const WhyJoinCodeEternity = () => {
  const cards = [
    {
      title: "Innovative Projects",
      description:
        "Work on cutting-edge projects that challenge you and allow you to grow.",
      icon: "🚀",
    },
    {
      title: "Real-World Experience",
      description:
        "Gain hands-on experience on live projects—prepare for real tech challenges.",
      icon: "🌍",
    },
    {
      title: "Expert Mentorship",
      description:
        "Learn from seasoned professionals and tech leads who care about your journey.",
      icon: "👨‍💻",
    },
    {
      title: "Skill Development",
      description:
        "Sharpen your skills with real feedback, guided modules, and tech-driven tasks.",
      icon: "📚",
    },
    {
      title: "Collaborative Culture",
      description:
        "Thrive in a community where brainstorming, peer reviews, and idea-sharing is the norm.",
      icon: "🤝",
    },
    {
      title: "Career Growth",
      description:
        "Step up your career ladder with tailored roles, responsibility, and exposure.",
      icon: "📈",
    },
  ];

  return (
    <>
      <img
        src={img3}
        alt="Background"
        className="w-full bg-[#fffbf4] h-auto object-cover"
      />

      <section className="py-16 bg-[#b1d8fc] text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
            Why Join <span className="text-[#2750c4]">CodeEternity</span>?
          </h2>

          {/* Row 1 (1w + 1w + 2w layout) */}
          <div className="flex flex-wrap gap-16 justify-center mb-10">
            <div className="w-fit md:w-1/6">
              <Card {...cards[0]} />
            </div>
            <div className="w-fit md:w-1/6">
              <Card {...cards[1]} />
            </div>
            <div className="w-fit md:w-1/3">
              <Card {...cards[2]} />
            </div>
          </div>

          {/* Row 2 (2w + 1w + 1w layout) */}
          <div className="flex flex-wrap gap-16 justify-center">
            <div className="w-full md:w-1/3">
              <Card {...cards[3]} />
            </div>
            <div className="w-full md:w-1/6">
              <Card {...cards[4]} />
            </div>
            <div className="w-full md:w-1/6">
              <Card {...cards[5]} />
            </div>
          </div>

          {/* Button */}
          <div className="mt-14 text-center">
            <Link
              to="/whatweoffer"
              className="px-8 py-4 text-lg font-bold bg-orange-400 text-white rounded-full shadow-md transform transition duration-300 hover:bg-orange-600 hover:scale-105 hover:shadow-lg"
            >
              Select Your Best-Fit Program
            </Link>
          </div>
        </div>
      </section>

      <img
        src={img4}
        alt="Background"
        className="w-full bg-[#fffbf4] h-auto object-cover"
      />
    </>
  );
};

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-[#6c94f7] to-[#68c3f1] hover:text-white h-full">
      <div className="flex justify-center text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
      <p className="text-sm leading-relaxed text-center">{description}</p>
    </div>
  );
};

export default WhyJoinCodeEternity;