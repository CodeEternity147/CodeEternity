"use client"

import { useState } from "react"
import { FiPlus, FiMinus } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"

const FAQItem = ({ question, answer, isOpen = false, toggleOpen }) => {
    return (
      <div className="border-t border-gray-300">
        <button
          className="flex justify-between items-center w-full py-4 sm:py-6 text-left focus:outline-none hover:bg-gray-100 transition-colors duration-300 px-2 sm:px-4 rounded-md"
          onClick={toggleOpen}
        >
          <h3 className="text-lg sm:text-xl md:text-[23px] text-black font-semibold pr-4">{question}</h3>
          <div className="bg-black rounded-full p-1 text-white hover:bg-gray-800 transition-colors duration-300 flex-shrink-0">
            {isOpen ? <FiMinus size={18} className="sm:w-5 sm:h-5" /> : <FiPlus size={18} className="sm:w-5 sm:h-5" />}
          </div>
        </button>
  
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-4 sm:pb-6 px-2 sm:px-3 text-base sm:text-[19px] text-gray-700 leading-relaxed bg-[#fffaf4] rounded-md shadow-sm">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
  

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Why choose an internship from CodeEternity?",
      answer: (
        <p>
          Interning at <strong>CodeEternity</strong> offers a unique opportunity to gain hands-on experience and grow
          professionally. Our team is dedicated to innovation, mentorship, and creating a dynamic learning environment.
          You'll work on real-world projects with industry experts and develop practical skills that set you apart in the
          tech world.
        </p>
      ),
    },
    {
      question: "How does CodeEternity help me stay up to date with new skills?",
      answer: (
        <p>
          At <strong>CodeEternity</strong>, we provide access to modern tools, resources, and training programs tailored
          to your career goals. You'll work on challenging projects, collaborate with experienced developers, and
          continuously sharpen your skills in a supportive environment.
        </p>
      ),
    },
    {
      question: "What technologies and tools will I learn at CodeEternity?",
      answer: (
        <p>
          You'll gain experience with technologies like <strong>JavaScript, React, Node.js, MongoDB, Git, Firebase</strong>,
          and deployment platforms like <strong>Vercel</strong> and <strong>Netlify</strong>. We ensure you're comfortable with
          full-stack workflows used in the real world.
        </p>
      ),
    },
    {
      question: "Is CodeEternity a good place to start my tech career?",
      answer: (
        <p>
          Absolutely! <strong>CodeEternity</strong> is perfect for aspiring developers who want to build strong
          foundations. We offer practical learning, dedicated mentorship, and real-world exposure.
        </p>
      ),
    },
    {
      question: "Will I get a certificate after completing the internship?",
      answer: (
        <p>
          Yes, all interns receive a <strong>certificate</strong> upon successful completion. It's a great way to show
          your hands-on experience and practical contributions during your internship.
        </p>
      ),
    },
    {
      question: "Are there any hidden costs involved in the internship?",
      answer: (
        <p>
          <strong>No hidden costs!</strong> Everything is clearly communicated upfront. Our mission is to make
          high-quality tech education accessible and transparent.
        </p>
      ),
    },
    {
      question: "How do I apply for an internship at CodeEternity?",
      answer: (
        <p>
          You can apply through our website by filling out the internship form. Once submitted, our team will contact
          you for the next steps. We look forward to welcoming you!
        </p>
      ),
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? -1 : index)
  }

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">FAQs</h2>
          </div>
          <div className="md:w-[80%]">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
