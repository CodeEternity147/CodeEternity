import React from 'react';
import img1 from '../../assets/img1.svg';
import img2 from '../../assets/img2.svg';

const InformationSection = () => {
  return (
    <>
      <img
        src={img1}
        alt="Background"
        className="w-full bg-[#fffbf4] h-auto object-cover"
      />

      <section className="py-16 bg-[#fffbf4] text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12">
            Why Choose <span className="text-[#2750c4]">CodeEternity</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Expert Mentorship</h3>
                <p className="text-gray-600">
                  Learn from industry experts who have years of experience in their respective fields.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Real-World Projects</h3>
                <p className="text-gray-600">
                  Work on actual projects that will help you build a strong portfolio.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Career Support</h3>
                <p className="text-gray-600">
                  Get guidance on resume building, interview preparation, and job search strategies.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Flexible Learning</h3>
                <p className="text-gray-600">
                  Learn at your own pace with our flexible learning schedule.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Community</h3>
                <p className="text-gray-600">
                  Join a community of like-minded individuals and grow together.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Industry Recognition</h3>
                <p className="text-gray-600">
                  Get certified by industry leaders and boost your career prospects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img
        src={img2}
        alt="Background"
        className="w-full bg-[#fffbf4] h-auto object-cover"
      />
    </>
  );
};

export default InformationSection; 