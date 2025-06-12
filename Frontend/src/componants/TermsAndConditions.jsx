import React, { useState, useEffect } from 'react';
import { FileText, Scale, User, Shield, CreditCard, AlertTriangle, Lock, Gavel, Globe, Mail, MapPin, ChevronRight, CheckCircle } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';

const TermsAndConditions = () => {
  useScrollToTop();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: 'By using CodeEternity\'s services, you agree to these Terms and Conditions. This is a binding agreement between you and CodeEternity. Continued use of our platform indicates acceptance of these terms and any future modifications.'
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Globe,
      content: 'We provide software development internships, educational content, mentorship, and career resources. Services include learning modules, mentoring, project-based learning, and certifications. We may modify or discontinue services with appropriate notice.'
    },
    {
      id: 'accounts',
      title: 'User Accounts and Registration',
      icon: User,
      content: 'You must provide accurate information when creating an account. You\'re responsible for account security and activities. Report unauthorized access immediately. Users must be 16+ years old, with parental consent required for those under 18.'
    },
    {
      id: 'conduct',
      title: 'User Conduct and Responsibilities',
      icon: Shield,
      content: 'Use our services legally and ethically. Prohibited: false information, harassment, unauthorized access, malicious content, IP violations, and unauthorized commercial use. You\'re responsible for all content you submit.'
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property Rights',
      icon: Lock,
      content: 'All CodeEternity content is protected by IP laws. You get a limited, non-transferable license for personal educational use. No reproduction or distribution without permission. Program-specific ownership terms apply to your work.'
    },
    {
      id: 'payments',
      title: 'Payment Terms and Refunds',
      icon: CreditCard,
      content: 'Fees are non-refundable unless stated otherwise. Full payment required before accessing paid services. We may change pricing with 30 days\' notice. Full refunds for our cancellations. Case-by-case review for special circumstances.'
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: 'Services provided "as is." No warranties on content accuracy. We\'re not liable for indirect damages. Maximum liability limited to amount paid for specific service. No guarantees on job placement or specific outcomes.'
    },
    {
      id: 'termination',
      title: 'Termination of Services',
      icon: Gavel,
      content: 'Either party may terminate with notice. We may suspend access for violations or harmful activities. Access ends immediately upon termination. IP, liability, and dispute terms survive termination. Account deletion available per Privacy Policy.'
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: Shield,
      content: 'Privacy governed by our Privacy Policy. You consent to data collection as described. We implement security measures but can\'t guarantee absolute security. You have rights to access, correct, and delete your data per applicable laws.'
    },
    {
      id: 'governing',
      title: 'Governing Law and Dispute Resolution',
      icon: Scale,
      content: 'Terms governed by Indian law. Disputes subject to Noida, UP courts. Direct communication first, then mediation, then litigation if needed. Prevailing party may recover legal costs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-300 to-purple-100 relative py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Understanding our terms of service
          </p>
          <p className="text-indigo-600 font-medium">
            Effective from: {new Date().toLocaleDateString()}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-12 border border-white/30 hover:shadow-3xl hover:bg-white/90 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl" />
          <div className="flex items-start gap-6 relative z-10">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-inner border border-blue-100/50">
              <Scale className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Legal Agreement
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                These Terms and Conditions ("Terms") govern your use of the CodeEternity website located at{' '}
                <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                  https://codeeternity.com
                </span>{' '}
                and all related services, features, content, and applications offered by CodeEternity. 
                Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <div 
                key={section.id}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/90 hover:scale-[1.01] p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300 shadow-inner border border-blue-100/50 flex-shrink-0">
                      <Icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-800 transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-amber-200/50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">Important Notice</h3>
              <p className="text-amber-700 leading-relaxed">
                These terms may be updated from time to time to reflect changes in our services, legal requirements, 
                or business practices. We will notify users of significant changes via email or through prominent 
                notices on our website. Your continued use of our services after any modifications constitutes 
                acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden border border-gray-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-slate-700/30 backdrop-blur-sm" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Questions About Our Terms?</h3>
              <p className="text-gray-300 text-lg">
                Contact us for clarification on any aspect of our terms and conditions.
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
                    <p className="text-gray-300">Building tomorrow's developers</p>
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
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <Mail className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Legal Inquiries</p>
                    <p className="text-gray-300">Use our contact form for terms clarification</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-600/30">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Scale className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Legal Framework</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        These terms and conditions are governed by Indian law and comply with the Information Technology Act, 2000. 
                        All disputes are subject to the jurisdiction of courts in Noida, Uttar Pradesh, India.
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

export default TermsAndConditions;