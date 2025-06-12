import React, { useState, useEffect } from 'react';
import { Shield, Eye, Users, Lock, Clock, UserCheck, Baby, Cookie, FileText, Mail, MapPin, Globe, ChevronRight, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 'collect',
      title: 'What information do we collect?',
      icon: Eye,
      content: 'We collect information you provide directly when you use our website and apply for internship programs. This includes registration information such as your name, email address, phone number, educational background, technical skills, and current academic institution. We also collect your resume, portfolio links, project descriptions, and any certifications. Additionally, we automatically collect log files containing your browser type, IP address, pages visited, timestamps, and clicks. We use cookies to store your preferences and activity on our website to provide a personalized experience.'
    },
    {
      id: 'use',
      title: 'How do we use your information?',
      icon: Users,
      content: 'We use the collected information to provide, operate, and maintain our website and internship programs. This includes processing applications, matching you with appropriate mentors, delivering personalized learning experiences, and communicating about course enrollment, updates, and opportunities. We analyze usage patterns to improve our website content and services, develop new features, and ensure the security of our platform. We also use your information to send administrative emails and find and prevent fraudulent activities.'
    },
    {
      id: 'share',
      title: 'Do we share your information with third parties?',
      icon: UserCheck,
      content: 'We will not share your personal information with third parties except in specific circumstances. We may share information with trusted service providers who help us operate our website and deliver our services, such as cloud hosting providers, email services, and payment processors. These providers are contractually obligated to keep your information confidential. We may also share information with educational institutions for college credit arrangements and with our mentors for training purposes. Additionally, we may disclose your information if required by law or to protect the rights and safety of ourselves or others.'
    },
    {
      id: 'protect',
      title: 'How do we protect your information?',
      icon: Lock,
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes using encryption protocols for data transmission and storage, maintaining secure servers with firewalls and intrusion detection systems, and limiting access to your information to authorized personnel only. We conduct regular security audits and updates to maintain the highest security standards. However, no internet transmission is completely secure, and we cannot guarantee absolute security of your information.'
    },
    {
      id: 'retain',
      title: 'How long do we retain your information?',
      icon: Clock,
      content: 'We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. For active interns, we maintain records throughout your program and for an additional two years for ongoing support and references. Academic records are retained for up to seven years to comply with educational standards and support verification requests. When retention periods expire, we securely delete your information from our systems.'
    },
    {
      id: 'rights',
      title: 'What are your rights regarding your personal data?',
      icon: CheckCircle,
      content: 'You have several rights regarding your personal information. You have the right to access and request a copy of the information we hold about you. You can request corrections to any inaccurate information and ask for deletion of your personal data under certain conditions. You also have the right to restrict or object to the processing of your information and request data portability to transfer your information to another organization. You can withdraw consent for marketing communications at any time. To exercise these rights, please contact us using the information provided below.'
    },
    {
      id: 'children',
      title: 'How do we handle children\'s information?',
      icon: Baby,
      content: 'CodeEternity does not knowingly collect any personally identifiable information from children under the age of 13. Our internship programs are designed for individuals aged 16 and above, typically college students and graduates. If you believe your child has provided such information to us, please contact us immediately and we will remove it from our records. For participants between 13-18 years, we require parental consent and provide additional safeguards during program participation.'
    },
    {
      id: 'cookies',
      title: 'What about cookies and tracking technologies?',
      icon: Cookie,
      content: 'We use cookies and similar tracking technologies to enhance your browsing experience and provide personalized services. Cookies help us remember your preferences, maintain your login session, and analyze website usage patterns. You can control cookie settings through your browser preferences and choose to accept, reject, or receive notifications about cookies. However, disabling certain cookies may limit some website functionality and features.'
    },
    {
      id: 'changes',
      title: 'How do we handle changes to this policy?',
      icon: FileText,
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business operations. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Modified" date. For significant changes, we may also send direct email notifications to registered users. Your continued use of our services after any changes constitutes acceptance of the updated privacy policy.'
    },
    {
      id: 'contact',
      title: 'How can you contact us?',
      icon: Mail,
      content: 'If you have any questions about this Privacy Policy, need assistance with your data rights, or have privacy concerns, please contact us through our website\'s contact form or visit our offices. We strive to respond to all privacy-related inquiries within 48 hours and provide comprehensive assistance within 30 days as required by applicable laws.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-300 to-purple-100 relative py-16 overflow-hidden">
      

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Your privacy is our priority
          </p>
          <p className="text-indigo-600 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-12 border border-white/30 hover:shadow-3xl hover:bg-white/90 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl" />
          <div className="flex items-start gap-6 relative z-10">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-inner border border-blue-100/50">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">Welcome to CodeEternity</h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                At CodeEternity, accessible from <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">https://codeeternity.com</span> 
                one of our main priorities is the privacy of our visitors and interns. This Privacy Policy document contains 
                the types of information that is collected and recorded by CodeEternity and how we use it.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div 
                key={section.id}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/90 hover:scale-[1.02] ${
                    isActive ? 'ring-2 ring-indigo-400 shadow-indigo-100' : ''
                  }`}
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                >
                  <div className="p-6 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300 shadow-inner border border-blue-100/50">
                          <Icon className="w-7 h-7 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-800 transition-colors">
                          {section.title}
                        </h2>
                      </div>
                      <ChevronRight 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isActive ? 'rotate-90' : 'group-hover:rotate-90'
                        }`} 
                      />
                    </div>
                    
                    <div className={`mt-4 overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-slate-700 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden border border-gray-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-slate-700/30 backdrop-blur-sm" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-300 text-lg">
                Have questions about your privacy? We're here to help.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">CodeEternity</p>
                    <p className="text-gray-300">Your trusted learning partner</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Primary Office</p>
                    <p className="text-gray-300">Commercial Market, Block H, Sector 63, Noida, Uttar Pradesh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Alternate Office</p>
                    <p className="text-gray-300">Ward No. 6, Sondhi Block Khetasarai, Jaunpur, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <Globe className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Website</p>
                    <a href="https://codeeternity.com" className="text-cyan-300 hover:text-cyan-200 transition-colors underline underline-offset-2">
                      codeeternity.com
                    </a>
                  </div>
                </div>
                
                
                
                <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-600/30">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <FileText className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2">Legal Compliance</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        This privacy policy is designed to comply with the Information Technology Act, 2000, and associated rules in India. 
                        By using our services, you acknowledge that you have read, understood, and agree to be bound by this privacy policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;