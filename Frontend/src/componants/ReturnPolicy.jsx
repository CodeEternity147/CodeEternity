import React from 'react';
import { ArrowLeft, Clock, AlertCircle, CheckCircle, XCircle, HelpCircle, Mail, Phone } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';

const ReturnPolicy = () => {
  useScrollToTop();
  
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: CheckCircle,
      content: 'Our return policy is designed to ensure customer satisfaction while maintaining fair business practices. This policy applies to all services and products offered by CodeEternity.'
    },
    {
      id: 'eligibility',
      title: 'Eligibility for Returns',
      icon: AlertCircle,
      content: 'Refunds for digital courses are only allowed within 3 days after purchase and only if you haven\'t joined any classes. Digital services and courses are non-refundable once you start course. Internship program fees are non-refundable after program start.'
    },
    {
      id: 'process',
      title: 'Return Process',
      icon: ArrowLeft,
      content: 'To initiate a return, contact our support team within the eligible period. Provide order details and reason for return. For physical products, ensure original packaging and condition. Returns must be shipped within 3 days of approval.'
    },
    {
      id: 'refunds',
      title: 'Refund Policy',
      icon: Clock,
      content: 'Approved refunds are processed within 7-14 business days. Refunds are issued to the original payment method. Processing fees may be deducted. Course credits may be offered instead of refunds for digital services.'
    },
    {
      id: 'exceptions',
      title: 'Exceptions',
      icon: XCircle,
      content: 'No returns for: accessed digital content, started internship programs, customized services, or items damaged by customer. Special circumstances may be considered on a case-by-case basis.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-300 to-purple-100 relative py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <ArrowLeft className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Return Policy
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Understanding our return and refund process
          </p>
          <p className="text-indigo-600 font-medium">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Main Content */}
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
              <HelpCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">Need Help?</h3>
              <p className="text-amber-700 leading-relaxed">
                If you have any questions about our return policy or need assistance with a return, 
                please contact our support team. We're here to help ensure your satisfaction with our services.
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
              <h3 className="text-3xl font-bold mb-4">Contact Support</h3>
              <p className="text-gray-300 text-lg">
                Our support team is ready to assist you with any return-related queries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email Support</p>
                    <p className="text-gray-300">info@codeeternity.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-xl border border-gray-600/50">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone Support</p>
                    <p className="text-gray-300">+91 8874 700 800</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-600/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Response Time</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      We typically respond to return requests within 24-48 hours during business days. 
                      For urgent matters, please contact our phone support.
                    </p>
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

export default ReturnPolicy; 