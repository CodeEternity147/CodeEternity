import React from 'react';

const features = [
  {
    title: ['Automate', 'contractor invoices'],
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <path d="M20 50L50 20L80 50L50 80L20 50Z" fill="#D6E8FF" />
        <path d="M30 50L50 30L70 50L50 70L30 50Z" fill="#005AE0" />
      </svg>
    ),
  },
  {
    title: ['Pay everyone with', 'one bulk payment'],
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="35" fill="#D6E8FF" />
        <circle cx="50" cy="40" r="15" fill="#0047AB" />
        <path d="M25 70C25 57.3 36.3 47 50 47C63.7 47 75 57.3 75 70" fill="#0047AB" />
      </svg>
    ),
  },
  {
    title: ['5+ flexible', 'payment methods'],
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="45" r="25" fill="#D6E8FF" />
        <circle cx="50" cy="45" r="20" fill="#D6E8FF" stroke="#0047AB" strokeWidth="3" />
        <circle cx="50" cy="45" r="15" fill="white" stroke="#0047AB" strokeWidth="2" />
        <path d="M50 35V45H60" stroke="#0047AB" strokeWidth="2" />
        <circle cx="50" cy="65" r="20" fill="#D6E8FF" stroke="#0047AB" strokeWidth="3" />
        <path d="M45 65H55" stroke="#0047AB" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: ['We handle all', 'taxes, social contributions'],
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <path d="M20 70H80V30H20V70Z" fill="#D6E8FF" />
        <path d="M25 30H75V25H25V30Z" fill="#0047AB" />
        <path d="M30 70H70V75H30V70Z" fill="#0047AB" />
        <rect x="30" y="35" width="5" height="30" fill="#0047AB" />
        <rect x="45" y="35" width="5" height="30" fill="#0047AB" />
        <rect x="60" y="35" width="5" height="30" fill="#0047AB" />
      </svg>
    ),
  },
  {
    title: ['Track expenses,', 'bonuses, allowances'],
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
        <path d="M30 40C30 31.7 36.7 25 45 25H55C63.3 25 70 31.7 70 40V70C70 78.3 63.3 85 55 85H45C36.7 85 30 78.3 30 70V40Z" fill="#D6E8FF" />
        <path d="M30 45H70" stroke="#0047AB" strokeWidth="2" />
        <circle cx="65" cy="35" r="5" fill="#0047AB" />
        <circle cx="55" cy="35" r="5" fill="#0047AB" />
      </svg>
    ),
  },
];

const TeamPaymentFeatures = () => {
  return (
    <section className="bg-[#FFF8F0] py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
        CodeEternity helps you <br />
        <span className="text-blue-700">build faster, together</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Empower your dev team with efficient task management, bulk sync, and total control over collaboration tools.        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-[1.03]"
          >
            <div className="mb-4">{feature.icon}</div>
            {feature.title.map((line, i) => (
              <h3 key={i} className="text-gray-800 font-medium text-[15px] leading-tight">
                {line}
              </h3>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPaymentFeatures;
