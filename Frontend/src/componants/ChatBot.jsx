import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
console.log(apiKey);


export default function ChatBot() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const messagesEndRef = useRef(null);
    const chatInputRef = useRef(null);

    

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && chatInputRef.current) {
            chatInputRef.current.focus();
        }
    }, [isOpen]);

    // Add welcome message when chat first opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { 
                    type: "bot", 
                    text: "👋 Hello! I'm your CodeEternity assistant. How can I help you today?" 
                }
            ]);
        }
        
        // Show/hide the notification after a delay to attract attention
        if (!isOpen) {
            const timer = setTimeout(() => {
                // This would trigger a state update if we needed to show the notification after a delay
                // For now, it's always visible when chat is closed
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await GenerateResponse();
        }
    }

    async function GenerateResponse() {
        if (!question.trim()) return;

        const userMessage = { type: "user", text: question };
        setMessages(prev => [...prev, userMessage]);
        setQuestion("");
        setIsTyping(true);

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                method: "POST",
                data: {
                    contents: [
                        {
                            parts: [{ text: question }]
                        }
                    ],
                    "system_instruction": {
                        "parts": [{ "text": `CodeEternity – Empowering Talents, Engineering Solutions
About the Company
CodeEternity is a certified IT startup based in Noida, Uttar Pradesh, with an alternate registered address in Jaunpur, UP. Founded in 2023, the company focuses on practical, hands-on internship and training programs in software development, business, and IT management.

Headquarters:
📍 Commercial Market, Block H, Sector 63, Noida, Uttar Pradesh, India
📍 Ward No. 6, Sondhi Block Khetasarai, Jaunpur, Uttar Pradesh, India

Recognized Certifications
✅ MSME (Micro, Small & Medium Enterprises)

✅ Start-up India

✅ NSDC (National Skill Development Corporation)

✅ AICTE (All India Council for Technical Education)
These reflect a commitment to quality, innovation, and national skill development.

Internship Programs
CodeEternity offers remote, skill-based internships that combine theory with real-world applications. Interns typically work 6 hours per week, gaining experience through:

Real project work in technologies like Python, Java, C++, React, etc.

Expert mentorship

Opportunities to earn college credit through collaborations

Participation in open-source contributions, documentation, and teamwork

Domains Offered
Internships and training are available in both tech and business fields:

🔹 Frontend & Backend Development

🔹 Python, C/C++, Java Programming

🔹 Data Science & React.js

🔹 Android Development

🔹 Cybersecurity

🔹 UI/UX Design

🔹 Digital Marketing & Sales (for BBA/BCOM)

🔹 IT Management (MBA/BBA)

Each domain includes project-based learning and detailed program curricula.

Why Choose CodeEternity?
Hands-on experience with real applications and server-side projects

Easy application via online form

Mentorship by industry experts in development, cybersecurity, and IT management

Focus on collaboration, leadership, and interview preparation

Inclusivity for learners from all backgrounds

Application Process
Visit the official website

Go to the "Apply" or "Internship" section

Fill and submit the online form

Await feedback and next steps

Website Structure
The website is clearly structured with sections for:

🏠 Home

🧑‍💼 About

📚 Programs/Domains (with "View Details")

📝 Apply

📞 Contact

🧑‍🏫 Mentors

📜 Certifications

Folder structure uses subdirectories like /frontend-development/, /python-development/, /apply/, etc., for logical navigation.

Core Values
Empowerment through accessible education

Innovation in tech learning

Excellence backed by certifications

Inclusivity for all learners

Support through expert mentorship

Quick Links
🌐 Website: codeeternity.com

🔗 Alternate: codeeternityofficial.netlify.app

📝 Apply: Available on both websites under the "Apply" tab

📩 Contact: Via the "Contact" page

"You are an AI chatbot integrated into a website to assist users via real-time internet chat. Always respond in the same language as the question. Your tone should feel human-like, friendly, and natural. Ensure all responses are concise, clear, and to the point while still delivering the required information. Avoid unnecessary elaboration. Never disclose your capabilities, limitations, or internal processes."

` }]
                      }
                }
            });

            const botText = response?.data?.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
            
            // Simulate typing effect with a small delay
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: "bot", text: botText }]);
            }, 700);

        } catch (error) {
            console.error(error);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: "bot", text: "Something went wrong. Please try again." }]);
            }, 500);
        }
    }

    // Animation classes for the chat bubble
    const chatBubbleAnimation = isButtonHovered 
        ? "animate-bounce" 
        : "transition-transform hover:scale-110";

    return (
        <div className="fixed bottom-4 right-4 z-50 font-sans">
            {/* Chat Toggle Button with Animations and Text */}
            <div className="relative">
                {/* Notification badge when closed */}
                {!isOpen && (
                    <div className="absolute -top-10 right-0 bg-white px-3 py-2 rounded-full shadow-md text-sm font-medium text-purple-700 border border-purple-200 animate-floating whitespace-nowrap">
                        <span className="mr-2">👋</span>
                        Need help? Chat with us!
                        <span className="absolute w-3 h-3 bg-white transform rotate-45 bottom-[-6px] right-6 border-r border-b border-purple-200"></span>
                    </div>
                )}
                
                {/* Animated circles around the button when closed */}
                {!isOpen && (
                    <>
                        <div className="absolute inset-0 rounded-full border-4 border-purple-300 opacity-40 animate-ping-slow"></div>
                        <div className="absolute inset-[-8px] rounded-full border-2 border-purple-200 opacity-60 animate-ping-slower"></div>
                    </>
                )}
                
                {/* Only show this button when chat is closed */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg 
                                bg-gradient-to-r from-purple-500 to-purple-600 text-white 
                                hover:from-purple-600 hover:to-purple-700 transition-all duration-300
                                animate-pulse ${chatBubbleAnimation}`}
                        aria-label="Open chat"
                    >
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>

            {/* Chat Window with Slide Animation */}
            {isOpen && (
                <div className="animate-slideUp mt-2 w-80 sm:w-96 h-[80vh] sm:h-[500px]  bg-white shadow-xl rounded-2xl flex flex-col border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 flex items-center justify-between rounded-t-lg">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                <span className="text-purple-500 font-bold">CE</span>
                            </div>
                            <div>
                                <div className="font-bold">CodeEternity Assistant</div>
                                <div className="text-xs opacity-75">Online</div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition p-1 hover:bg-purple-700 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                                {msg.type === "bot" && (
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                                        <span className="text-xs font-bold">CE</span>
                                    </div>
                                )}
                                <div 
                                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm
                                              ${msg.type === "user" 
                                                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-tr-none" 
                                                : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"}`}
                                >
                                    {msg.text}
                                </div>
                                {msg.type === "user" && (
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 ml-2 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start animate-fadeIn">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                                    <span className="text-xs font-bold">CE</span>
                                </div>
                                <div className="bg-white p-3 rounded-2xl shadow-sm text-gray-500 border border-gray-200 rounded-tl-none">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Auto scroll reference */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message input */}
                    <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                        <textarea
                            ref={chatInputRef}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyPress}
                            rows={1}
                            className="flex-1 resize-none border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            placeholder="Type your message..."
                            style={{ maxHeight: "100px", minHeight: "40px" }}
                        />
                        <button
                            onClick={GenerateResponse}
                            disabled={!question.trim() || isTyping}
                            className={`bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full hover:from-purple-600 hover:to-purple-700 
                                      transition-all flex items-center justify-center w-10 h-10
                                      ${!question.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Footer */}
                    <div className="py-2 px-3 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                        Powered by <span className="font-semibold text-purple-600">CodeEternity</span>
                    </div>
                </div>
            )}
            
            {/* CSS Animations */}
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease forwards;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease forwards;
                }
                .animate-bounce {
                    animation: bounce 1s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes floating {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-floating {
                    animation: floating 3s ease-in-out infinite;
                }
                @keyframes ping-slow {
                    0% { transform: scale(0.95); opacity: 0.5; }
                    70% { transform: scale(1.1); opacity: 0; }
                    100% { transform: scale(1.1); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                @keyframes ping-slower {
                    0% { transform: scale(0.9); opacity: 0.7; }
                    70% { transform: scale(1.2); opacity: 0; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
                .animate-ping-slower {
                    animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}