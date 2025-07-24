const placementPrograms = [
  {
    key: 'Placement_0',
    index: 0,
    name: 'Full-Stack Placement Accelerator',
    description: 'A 24-week, intensive, outcome-driven program designed to guarantee you a job as a full-stack developer. Get hands-on mentorship, real-world projects, and direct interviews with our hiring partners. If you don\'t get placed, you get your money back—guaranteed.',
    summary: '100% Placement Guarantee. Become a job-ready developer in 4 months.',
    icon: '💻',
    iconBgColor: '#34d399',
    sideImg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VjY2Vzc3xlbnwwfHwwfHx8MA%3D%3D',
    sideImgAlt: 'Placement Accelerator',
    targetAudience: 'Final year students, recent graduates, career switchers',
    duration: '24',
    level: 'Job-Ready',
    prerequisites: 'Basic programming knowledge. Determination to get placed.',
    rating: 4.9,
    ratingCount: 4100,
    students: 5000,
    
    guaranteeTerms: '100% job guarantee within 6 months of graduation or your full fee refunded. Minimum CTC: ₹4LPA.',
    guaranteeDetails: {
      timeframe: '6 months post-graduation',
      minimumSalary: '₹4,00,000',
      refundPolicy: 'Full fee refund if not placed within guarantee period',
      conditions: [
        'Must attend 90% of classes',
        'Complete all assignments and projects',
        'Participate in placement drives',
        'Clear final assessment'
      ],
      successRate: '96.7%',
      avgTimeToPlacement: '45 days'
    },

    pricing: {
      originalPrice: '₹24,999',
      currentPrice: '₹19,999',
      discount: '20%',
      emiOptions: [
        { duration: '2 months', amount: '₹10,000' },
        { duration: '3 months', amount: '₹7,000' },
        { duration: '6 months', amount: '₹3,500' }
      ],
      scholarships: [
        { type: 'Merit Scholarship', discount: '30%', criteria: 'Top performers in entrance test' },
        { type: 'Women in Tech', discount: '20%', criteria: 'Female candidates' },
        { type: 'Early Bird', discount: '15%', criteria: 'First 50 enrollments' }
      ]
    },

    placementStats: {
      totalPlacements: 4836,
      averageSalary: '₹5.2L',
      highestSalary: '₹18L',
      salaryRanges: [
        { range: '₹3-5L', percentage: 45 },
        { range: '₹5-8L', percentage: 35 },
        { range: '₹8-12L', percentage: 15 },
        { range: '₹12L+', percentage: 5 }
      ],
      topRoles: [
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Software Engineer',
        'Web Developer'
      ]
    },

    placementPartners: [
      { 
        name: 'Tech Mahindra', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/TechMahindraLogo.svg',
        tier: 'Tier 1',
        avgSalary: '₹4.5L',
        positions: 150
      },
      { 
        name: 'TCS', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Consultancy_Services_Logo.svg',
        tier: 'Tier 1',
        avgSalary: '₹3.8L',
        positions: 200
      },
      { 
        name: 'Cognizant', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Cognizant_logo_2022.svg',
        tier: 'Tier 1',
        avgSalary: '₹4.2L',
        positions: 120
      },
      { 
        name: 'Accenture', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
        tier: 'Tier 1',
        avgSalary: '₹5.1L',
        positions: 80
      },
      { 
        name: 'HCL Technologies', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/HCL_Tech_Logo.svg',
        tier: 'Tier 1',
        avgSalary: '₹4.0L',
        positions: 100
      }
    ],

    successStories: [
      { 
        name: 'Amit S.', 
        text: 'I landed a 6LPA job at TCS within 2 weeks of graduating!', 
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        company: 'TCS',
        salary: '₹6L',
        role: 'Full Stack Developer',
        background: 'Mechanical Engineering Graduate',
        testimonialFull: 'The program completely transformed my career. From a mechanical engineer to a full-stack developer earning 6LPA - this seemed impossible before joining. The mentors were incredible and the placement support was beyond expectations.'
      },
      { 
        name: 'Priya R.', 
        text: 'The mock interviews and real projects made all the difference. Highly recommended!', 
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        company: 'Cognizant',
        salary: '₹5.5L',
        role: 'React Developer',
        background: 'Commerce Graduate',
        testimonialFull: 'Coming from a non-tech background, I was skeptical. But the structured curriculum and hands-on projects gave me confidence. The mock interviews were so realistic that the actual interviews felt easy!'
      },
      { 
        name: 'Rahul M.', 
        text: 'From fresher to team lead in 8 months. Best investment ever!', 
        avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
        company: 'Tech Mahindra',
        salary: '₹7.2L',
        role: 'Software Engineer',
        background: 'Computer Science Graduate',
        testimonialFull: 'Not only did I get placed, but I was promoted to team lead within 8 months. The program taught me not just coding but also leadership and communication skills that set me apart.'
      }
    ],

    curriculum: [
      {
        module: 'Placement Foundation',
        weeks: 'Week 1-4',
        description: [
          '• Career goal setting & resume building',
          '• Communication & interview skills',
          '• Git, GitHub, and team workflows',
          '• Coding challenges & hackathons'
        ],
        lessons: 5,
        students: 5000,
        projects: 2,
        assessments: 3,
        mentorSessions: 4
      },
      {
        module: 'Full-Stack Mastery',
        weeks: 'Week 5-12',
        description: [
          '• React, Node.js, Express, MongoDB',
          '• REST APIs & deployment',
          '• Real-world capstone project',
          '• Weekly code reviews'
        ],
        lessons: 8,
        students: 5000,
        projects: 4,
        assessments: 6,
        mentorSessions: 8
      },
      {
        module: 'Placement Sprint',
        weeks: 'Week 13-16',
        description: [
          '• Mock interviews with hiring managers',
          '• Direct interviews with partners',
          '• Offer negotiation & onboarding support',
          '• Lifetime alumni network access'
        ],
        lessons: 4,
        students: 5000,
        projects: 1,
        assessments: 2,
        mentorSessions: 6
      }
    ],

    programFeatures: [
      {
        title: '1:1 Mentorship',
        description: 'Personal mentor assigned for entire journey',
        icon: '👨‍🏫'
      },
      {
        title: 'Live Projects',
        description: 'Work on real client projects',
        icon: '🚀'
      },
      {
        title: 'Interview Prep',
        description: '50+ mock interviews with industry experts',
        icon: '🎯'
      },
      {
        title: 'Lifetime Support',
        description: 'Career support even after placement',
        icon: '🤝'
      },
      {
        title: 'Industry Connections',
        description: 'Direct access to 200+ hiring partners',
        icon: '🌐'
      },
      {
        title: 'Skill Certification',
        description: 'Industry-recognized certificates',
        icon: '🏆'
      }
    ],

    learningOutcomes: [
      'Build and deploy 5+ full-stack applications',
      'Master modern development tools and frameworks',
      'Develop strong problem-solving and debugging skills',
      'Excel in technical and behavioral interviews',
      'Build a professional developer portfolio',
      'Understand software development lifecycle'
    ],

    skills: [
      'Job Interview Mastery',
      'Full-Stack Project Delivery',
      'Team Collaboration',
      'Problem Solving',
      'Professional Communication'
    ],

    technologies: [
      { name: 'React', level: 'Advanced', icon: '⚛️' },
      { name: 'Node.js', level: 'Advanced', icon: '🟢' },
      { name: 'MongoDB', level: 'Intermediate', icon: '🍃' },
      { name: 'Express.js', level: 'Advanced', icon: '🚂' },
      { name: 'JavaScript', level: 'Advanced', icon: '🟨' },
      { name: 'HTML/CSS', level: 'Advanced', icon: '🎨' },
      { name: 'Git/GitHub', level: 'Intermediate', icon: '📚' },
      { name: 'AWS', level: 'Beginner', icon: '☁️' }
    ],

    supportSystem: {
      mentoringHours: '100+ hours',
      careerCounseling: 'Weekly sessions',
      technicalSupport: '24/7 doubt resolution',
      placementSupport: 'Dedicated placement officer',
      alumniNetwork: '10,000+ alumni',
      communitySupport: 'Active Discord community'
    },

    reactIcon: 'FaCode',

    faqs: [
      {
        question: 'What if I don\'t get placed?',
        answer: 'We offer 100% fee refund if you don\'t get placed within 6 months of graduation, provided you meet all program requirements.'
      },
      {
        question: 'What is the minimum salary guarantee?',
        answer: 'We guarantee a minimum CTC of ₹4 LPA. Our average placement salary is ₹5.2 LPA.'
      },
      {
        question: 'Can I pay in installments?',
        answer: 'Yes, we offer flexible EMI options starting from ₹8,334 per month for 18 months.'
      },
      {
        question: 'Do I need prior coding experience?',
        answer: 'Basic programming knowledge is required. We provide foundation courses for complete beginners.'
      }
    ]
  },

  {
    key: 'Placement_1',
    index: 1,
    name: 'Sales & Marketing Placement Bootcamp',
    description: 'A 12-week, hands-on bootcamp with a 100% placement guarantee in sales and digital marketing roles. Get real campaign experience, mentorship, and direct access to top recruiters. No job? 100% refund.',
    summary: 'Land your first marketing or sales job—guaranteed.',
    icon: '📈',
    iconBgColor: '#06b6d4',
    sideImg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    sideImgAlt: 'Sales & Marketing Bootcamp',
    targetAudience: 'Graduates, freshers, career changers',
    duration: '12',
    level: 'Job-Ready',
    prerequisites: 'Good communication skills. Passion for marketing/sales.',
    rating: 4.8,
    ratingCount: 3200,
    students: 3500,

    guaranteeTerms: '100% job guarantee within 4 months of graduation or your full fee refunded. Minimum CTC: ₹3LPA.',
    guaranteeDetails: {
      timeframe: '4 months post-graduation',
      minimumSalary: '₹3,00,000',
      refundPolicy: 'Full fee refund if not placed within guarantee period',
      conditions: [
        'Must attend 85% of classes',
        'Complete all practical assignments',
        'Participate in mock sales calls',
        'Clear final presentation'
      ],
      successRate: '94.5%',
      avgTimeToPlacement: '35 days'
    },

    pricing: {
      originalPrice: '₹24,999',
      currentPrice: '₹19,999',
      discount: '20%',
      emiOptions: [
        { duration: '6 months', amount: '₹11,667' },
        { duration: '12 months', amount: '₹5,834' },
        { duration: '18 months', amount: '₹3,889' }
      ],
      scholarships: [
        { type: 'Sales Champion', discount: '25%', criteria: 'Top performers in aptitude test' },
        { type: 'First Job Seekers', discount: '15%', criteria: 'Fresh graduates' },
        { type: 'Referral Bonus', discount: '10%', criteria: 'Referred by alumni' }
      ]
    },

    placementStats: {
      totalPlacements: 3312,
      averageSalary: '₹3.8L',
      highestSalary: '₹12L',
      salaryRanges: [
        { range: '₹2.5-4L', percentage: 50 },
        { range: '₹4-6L', percentage: 30 },
        { range: '₹6-8L', percentage: 15 },
        { range: '₹8L+', percentage: 5 }
      ],
      topRoles: [
        'Sales Executive',
        'Digital Marketing Specialist',
        'Business Development Associate',
        'Marketing Coordinator',
        'Inside Sales Representative'
      ]
    },

    placementPartners: [
      { 
        name: 'HDFC Bank', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/HDFC_Bank_Logo.svg',
        tier: 'Tier 1',
        avgSalary: '₹4.2L',
        positions: 100
      },
      { 
        name: 'Byju\'s', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/BYJU%27S_logo.svg',
        tier: 'Tier 1',
        avgSalary: '₹3.8L',
        positions: 80
      },
      { 
        name: 'UpGrad', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/UpGrad_logo.svg',
        tier: 'Tier 2',
        avgSalary: '₹4.5L',
        positions: 60
      }
    ],

    successStories: [
      { 
        name: 'Rohit K.', 
        text: 'Got placed at HDFC as a Relationship Manager. The guarantee is real!', 
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        company: 'HDFC Bank',
        salary: '₹4.5L',
        role: 'Relationship Manager',
        background: 'Arts Graduate'
      },
      { 
        name: 'Sneha D.', 
        text: 'From fresher to digital marketer at Byju\'s in 3 months!', 
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        company: 'Byju\'s',
        salary: '₹4L',
        role: 'Digital Marketing Executive',
        background: 'Commerce Graduate'
      }
    ],

    curriculum: [
      {
        module: 'Sales & Marketing Essentials',
        weeks: 'Week 1-4',
        description: [
          '• Sales pitch & negotiation',
          '• Digital marketing basics',
          '• CRM tools & analytics',
          '• Real campaign simulation'
        ],
        lessons: 5,
        students: 3500,
        projects: 2,
        assessments: 2,
        mentorSessions: 3
      },
      {
        module: 'Real-World Campaigns',
        weeks: 'Week 5-8',
        description: [
          '• Social media & content marketing',
          '• Lead generation & conversion',
          '• Client presentations',
          '• Industry mentor feedback'
        ],
        lessons: 6,
        students: 3500,
        projects: 3,
        assessments: 3,
        mentorSessions: 4
      },
      {
        module: 'Placement Launchpad',
        weeks: 'Week 9-12',
        description: [
          '• Mock sales/marketing interviews',
          '• Direct recruiter connects',
          '• Offer negotiation',
          '• Placement guarantee support'
        ],
        lessons: 4,
        students: 3500,
        projects: 1,
        assessments: 2,
        mentorSessions: 5
      }
    ],

    programFeatures: [
      {
        title: 'Live Campaign Experience',
        description: 'Work on real marketing campaigns',
        icon: '🎯'
      },
      {
        title: 'Sales Simulation Lab',
        description: 'Practice with real sales scenarios',
        icon: '💼'
      },
      {
        title: 'Industry Mentors',
        description: 'Learn from top sales professionals',
        icon: '👥'
      },
      {
        title: 'Networking Events',
        description: 'Connect with industry leaders',
        icon: '🤝'
      },
      {
        title: 'Certificate Programs',
        description: 'Google & Facebook certified courses',
        icon: '🏆'
      },
      {
        title: 'Career Coaching',
        description: 'Personal branding & interview prep',
        icon: '🎪'
      }
    ],

    learningOutcomes: [
      'Master consultative selling techniques',
      'Create and execute digital marketing campaigns',
      'Use CRM tools effectively for lead management',
      'Develop compelling sales presentations',
      'Understand customer psychology and behavior',
      'Build strong professional network'
    ],

    technologies: [
      { name: 'Salesforce CRM', level: 'Intermediate', icon: '☁️' },
      { name: 'Google Analytics', level: 'Advanced', icon: '📊' },
      { name: 'Facebook Ads', level: 'Advanced', icon: '📘' },
      { name: 'HubSpot', level: 'Intermediate', icon: '🧡' },
      { name: 'LinkedIn Sales', level: 'Advanced', icon: '💼' },
      { name: 'Email Marketing', level: 'Advanced', icon: '📧' },
      { name: 'SEO/SEM', level: 'Intermediate', icon: '🔍' },
      { name: 'Canva Design', level: 'Beginner', icon: '🎨' }
    ],

    supportSystem: {
      mentoringHours: '80+ hours',
      careerCounseling: 'Bi-weekly sessions',
      technicalSupport: 'Business hours support',
      placementSupport: 'Dedicated sales placement team',
      alumniNetwork: '5,000+ alumni',
      communitySupport: 'WhatsApp & Telegram groups'
    },

    skills: [
      'Sales Pitching',
      'Digital Campaigns',
      'CRM & Analytics',
      'Client Communication',
      'Interview Success'
    ],

    reactIcon: 'FaChartLine',

    faqs: [
      {
        question: 'Do I need prior sales experience?',
        answer: 'No prior experience required. We start from basics and build your skills progressively.'
      },
      {
        question: 'What type of companies hire from this program?',
        answer: 'Banks, EdTech, FinTech, E-commerce, and Digital Marketing agencies actively recruit our graduates.'
      },
      {
        question: 'Is the program suitable for introverts?',
        answer: 'Absolutely! We help build confidence and communication skills regardless of personality type.'
      },
      {
        question: 'What if I prefer marketing over sales?',
        answer: 'The program covers both domains. You can specialize based on your interest and aptitude.'
      }
    ]
  },

  {
    key: 'Placement_2',
    index: 2,
    name: 'HR Placement Fast-Track',
    description: 'A 10-week, placement-focused HR program with guaranteed interviews and job offers. Learn modern HR practices, get mentored by industry experts, and access our exclusive hiring network.',
    summary: 'Get placed in HR—fast, or your money back.',
    icon: '🧑‍💼',
    iconBgColor: '#a78bfa',
    sideImg: 'https://plus.unsplash.com/premium_photo-1663957827693-632e502843e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D',
    sideImgAlt: 'HR Placement Fast-Track',
    targetAudience: 'Graduates, MBA HR, aspiring HR professionals',
    duration: '10',
    level: 'Job-Ready',
    prerequisites: 'Interest in HR. Willingness to learn and get placed.',
    rating: 4.7,
    ratingCount: 750,
    students: 1200,

    guaranteeTerms: '100% job guarantee within 3 months of graduation or your full fee refunded. Minimum CTC: ₹2.5LPA.',
    guaranteeDetails: {
      timeframe: '3 months post-graduation',
      minimumSalary: '₹2,50,000',
      refundPolicy: 'Full fee refund if not placed within guarantee period',
      conditions: [
        'Must attend 90% of classes',
        'Complete HR case study projects',
        'Pass final HR assessment',
        'Participate in placement activities'
      ],
      successRate: '92.8%',
      avgTimeToPlacement: '28 days'
    },

    pricing: {
      originalPrice: '₹24,999',
      currentPrice: '₹19,999',
      discount: '20%',
      emiOptions: [
        { duration: '6 months', amount: '₹10,000' },
        { duration: '12 months', amount: '₹5,000' },
        { duration: '18 months', amount: '₹3,334' }
      ],
      scholarships: [
        { type: 'HR Excellence', discount: '30%', criteria: 'Psychology/HR background' },
        { type: 'Women Empowerment', discount: '20%', criteria: 'Female candidates' },
        { type: 'Fast Track', discount: '15%', criteria: 'Complete in 8 weeks' }
      ]
    },

    placementStats: {
      totalPlacements: 2046,
      averageSalary: '₹3.2L',
      highestSalary: '₹8L',
      salaryRanges: [
        { range: '₹2.5-3.5L', percentage: 55 },
        { range: '₹3.5-5L', percentage: 30 },
        { range: '₹5-7L', percentage: 12 },
        { range: '₹7L+', percentage: 3 }
      ],
      topRoles: [
        'HR Executive',
        'Recruiter',
        'HR Coordinator',
        'Talent Acquisition Specialist',
        'Employee Relations Officer'
      ]
    },

    placementPartners: [
      { 
        name: 'Infosys', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Infosys_logo.svg',
        tier: 'Tier 1',
        avgSalary: '₹3.5L',
        positions: 70
      },
      { 
        name: 'Wipro', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Wipro_Primary_Logo_Color_RGB.svg',
        tier: 'Tier 1',
        avgSalary: '₹3.2L',
        positions: 60
      },
      { 
        name: 'Randstad', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Randstad_Logo.svg',
        tier: 'Tier 2',
        avgSalary: '₹3.8L',
        positions: 40
      },
      { 
        name: 'ManpowerGroup', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/ManpowerGroup_logo.svg',
        tier: 'Tier 2',
        avgSalary: '₹3.0L',
        positions: 50
      }
    ],

    successStories: [
      { 
        name: 'Megha S.', 
        text: 'Placed at Infosys HR. The support was amazing!', 
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        company: 'Infosys',
        salary: '₹3.5L',
        role: 'HR Executive',
        background: 'Psychology Graduate',
        testimonialFull: 'The program gave me practical HR skills that textbooks never taught. From recruitment to employee engagement, I learned it all. The placement team was incredibly supportive throughout.'
      },
      { 
        name: 'Arjun V.', 
        text: 'Got my first HR job at Randstad. The guarantee is real!', 
        avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
        company: 'Randstad',
        salary: '₹4L',
        role: 'Talent Acquisition Specialist',
        background: 'Commerce Graduate',
        testimonialFull: 'Transitioning from commerce to HR seemed impossible. But this program made it happen. The hands-on training and mock interviews prepared me perfectly for the real world.'
      },
      { 
        name: 'Kavya P.', 
        text: 'From intern to HR Business Partner in 6 months!', 
        avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
        company: 'Wipro',
        salary: '₹5.2L',
        role: 'HR Business Partner',
        background: 'MBA HR',
        testimonialFull: 'The program not only got me placed but also gave me skills to grow rapidly. I was promoted to HR Business Partner within 6 months of joining Wipro.'
      }
    ],

    curriculum: [
      {
        module: 'HR Fundamentals',
        weeks: 'Week 1-3',
        description: [
          '• Recruitment & onboarding',
          '• HR analytics',
          '• Employee engagement',
          '• Labor law basics'
        ],
        lessons: 4,
        students: 2200,
        projects: 2,
        assessments: 2,
        mentorSessions: 3
      },
      {
        module: 'Modern HR Tools',
        weeks: 'Week 4-7',
        description: [
          '• HRMS & payroll',
          '• Performance management',
          '• Digital HR tools',
          '• Real HR case studies'
        ],
        lessons: 5,
        students: 2200,
        projects: 3,
        assessments: 3,
        mentorSessions: 4
      },
      {
        module: 'Placement Success',
        weeks: 'Week 8-10',
        description: [
          '• Mock HR interviews',
          '• Direct recruiter connects',
          '• Offer negotiation',
          '• Placement guarantee support'
        ],
        lessons: 3,
        students: 2200,
        projects: 1,
        assessments: 2,
        mentorSessions: 4
      }
    ],

    programFeatures: [
      {
        title: 'HR Simulation Lab',
        description: 'Practice with real HR scenarios',
        icon: '🎭'
      },
      {
        title: 'Industry Case Studies',
        description: 'Solve real HR challenges',
        icon: '📋'
      },
      {
        title: 'HR Tech Training',
        description: 'Master modern HRMS platforms',
        icon: '💻'
      },
      {
        title: 'Legal Compliance',
        description: 'Understand labor laws & policies',
        icon: '⚖️'
      },
      {
        title: 'Soft Skills Training',
        description: 'Communication & leadership skills',
        icon: '🗣️'
      },
      {
        title: 'Network Building',
        description: 'Connect with HR professionals',
        icon: '🌐'
      }
    ],

    learningOutcomes: [
      'Master end-to-end recruitment process',
      'Implement effective employee engagement strategies',
      'Use HR analytics for data-driven decisions',
      'Handle employee relations and conflict resolution',
      'Understand compliance and legal requirements',
      'Design performance management systems'
    ],

    technologies: [
      { name: 'Workday', level: 'Intermediate', icon: '📊' },
      { name: 'BambooHR', level: 'Advanced', icon: '🎋' },
      { name: 'LinkedIn Recruiter', level: 'Advanced', icon: '💼' },
      { name: 'SAP SuccessFactors', level: 'Beginner', icon: '📈' },
      { name: 'Naukri RMS', level: 'Advanced', icon: '🔍' },
      { name: 'MS Excel Advanced', level: 'Advanced', icon: '📊' },
      { name: 'Zoom/Teams', level: 'Advanced', icon: '📹' },
      { name: 'ATS Systems', level: 'Intermediate', icon: '🤖' }
    ],

    supportSystem: {
      mentoringHours: '60+ hours',
      careerCounseling: 'Weekly sessions',
      technicalSupport: 'Business hours support',
      placementSupport: 'Dedicated HR placement specialist',
      alumniNetwork: '3,000+ alumni',
      communitySupport: 'LinkedIn HR community'
    },

    skills: [
      'Recruitment',
      'HR Analytics',
      'Digital HR Tools',
      'Employee Engagement',
      'Interview Success'
    ],

    reactIcon: 'FaUsers',

    faqs: [
      {
        question: 'Do I need an MBA to get placed in HR?',
        answer: 'No, while MBA helps, we have successfully placed graduates from various backgrounds. Skills matter more than degrees.'
      },
      {
        question: 'What is the scope for growth in HR careers?',
        answer: 'HR offers excellent growth opportunities - from Executive to CHRO level. Our alumni have grown to senior positions within 2-3 years.'
      },
      {
        question: 'Will I learn about HR laws and compliance?',
        answer: 'Yes, we cover essential labor laws, compliance requirements, and legal aspects of HR management.'
      },
      {
        question: 'Are there opportunities in startups or only large companies?',
        answer: 'We place candidates in both startups and large corporations. Startups often offer faster growth and diverse responsibilities.'
      }
    ]
  }
];

export default placementPrograms;
      