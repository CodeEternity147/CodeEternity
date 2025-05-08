import { useState } from "react";

export default function TransparentBox() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="relative w-60 h-72 cursor-pointer transition-all duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background shape with transparency and border */}
        <div className="absolute inset-0 rounded-[100px] border border-gray-300 bg-white/30 backdrop-blur-sm transition-all duration-500 ease-in-out overflow-hidden">
          {/* Infinity SVG pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg viewBox="0 0 240 140" className="w-full h-full">
              <path
                d="M60,70 
                   C60,30 100,30 115,70 
                   C100,110 60,110 60,70 
                   
                   M180,70 
                   C180,30 140,30 125,70 
                   C140,110 180,110 180,70"
                fill="none"
                stroke="#888"
                strokeWidth="8"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Hover content with gradient */}
          <div
  className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 flex flex-col items-center justify-center font-semibold text-black px-6 py-4 transition-all duration-1000 ease-in-out transform ${
    isHovered ? "opacity-100 translate-y-0 border-gray-500" : "opacity-0 translate-y-10"
  }`}
>
  <h3 className="text-lg font-semibold text-center mb-2">
    Internship at CodeEternity
  </h3>
  <p className="text-sm text-center mb-4">
    Work on live projects, gain mentorship, and enhance your skills.
  </p>
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-purple-600 transition duration-300"
  >
    Apply Now
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </a>
</div>

        </div>
      </div>
    </div>
  );
}
