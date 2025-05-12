import { FiArrowRight } from "react-icons/fi";
import Lottie from "lottie-react";
import earthAnimation from '../../data/Animation - 1746380129171.json';
import img5 from "../../assets/img5.svg";

import msmeLogo from '../../assets/msme.png';
import startupLogo from "../../assets/startup.png";
import nsdcLogo from "../../assets/nsdc.png";
import aicteLogo from "../../assets/aicte.png";
import iso9001Logo from "../../assets/Iso9001.png";

const companies = [
  { name: 'Tech Mahindra', logo: 'https://cdn.prod.website-files.com/65a11e98184e9d03348f2bc5/65a11e98184e9d03348f2d39_Tech_Mahindra_Logo%20BW%20PNG-min.png' },
  { name: 'HCL', logo: 'https://cdn.simpleicons.org/hcl/6B7280' },
  { name: 'Byju\'s', logo: 'https://cdn.simpleicons.org/byjus/6B7280' },
  { name: 'Paytm', logo: 'https://cdn.simpleicons.org/paytm/6B7280' },
  {name:'collegedekho', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYGmM7615qNY0D6h4GXeB7kUijOiIZCw7uw&s'},
  { name: 'EY', logo: 'https://1000logos.net/wp-content/uploads/2020/04/ernst-young-ey-logo.png' },
  { name: 'Deloitte', logo: 'https://energy-dialogues.com/wp-content/uploads/2019/03/gray-logo-deloitte.png' },
  { name: 'Z', logo: 'https://i.pinimg.com/736x/e4/92/be/e492be62feff5fd29949f87e82e6d5ac.jpg' },
  { name: 'TCS', logo: 'https://cdn.simpleicons.org/tcs/6B7280' },
  {name : 'BookmyShow', logo: 'https://cdn.simpleicons.org/bookmyshow/6B7280'},
  {name : 'celonis', logo: 'https://www.ecube.de/wp-content/uploads/2023/01/Celonis-Logo-grey.png'},
  
  

];

const TrustedCompanies = () => {
  return (
    <section className="bg-[#ffe27c]   overflow-hidden py-8">
      <div className="text-center mb-6 text-gray-700 font-semibold text-sm uppercase tracking-wider">
        Industry-Backed Educators
      </div>
      <div className="w-full overflow-hidden">
        <div className="logo-slider">
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="h-12 sm:h-14 md:h-16 w-32 flex-shrink-0 flex items-center justify-center mx-4"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Hero = () => {
  return (
    <>
      <section className="min-h-screen  bg-[#ffe27c] mt-28 pt-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-gray-600 font-medium uppercase tracking-wider">
                CODEETERNITY
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Talents, Engineering Solutions
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-xl">
              At our core, we empower your talents and engineer innovative 
solutions, providing the training you need to turn your dreams into 
reality. Our company proudly holds certifications from <strong>MSME</strong>, <strong>Start-up India</strong>, <strong>NSDC</strong>, and <strong>AICTE</strong>, reflecting our commitment to excellence 
and pioneering innovation. Together, we cultivate skills and inspire 
growth, making your aspirations our mission
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                Get Started
              </button>
              <button className="bg-amber-50 text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-amber-100 transition-colors duration-300 flex items-center gap-2">
                Learn More
                <FiArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Certificates Logos BELOW buttons */}
            <div className="flex flex-wrap mb-16 items-center gap-3 ">
              <img src={msmeLogo} alt="MSME" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
              <img src={startupLogo} alt="Startup India" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
              <img src={iso9001Logo} alt="ISO 9001" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
              <img src={nsdcLogo} alt="NSDC" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
              <img src={aicteLogo} alt="AICTE" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
          </div>

          {/* Right Animation */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <Lottie animationData={earthAnimation} loop={true} className="w-full max-w-[550px] h-auto" />
          </div>

        </div>
      </section>

      <TrustedCompanies />

      <img 
        src={img5} 
        alt="Footer Background" 
        className="w-full bg-[#FFF8F0] h-auto object-cover"
      />
    </>
  );
};

export default Hero;