import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Faq = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    window.scrollTo(0, 0);
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "#f97316",
      mixBlendMode: "difference",
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "#ffffff",
      height: 80,
      width: 80,
      mixBlendMode: "difference",
    },
  };

  const [active, setActive] = useState(null);

  const toggleAccordion = (id) => {
    setActive(active === id ? null : id);
  };

  const generalFaqs = [
    { id: 1, question: "How do I choose the car I want?", answer: "You can explore our fleet by filtering based on car type, fuel efficiency, price, or brand preferences." },
    { id: 2, question: "Are all the cars I see online here?", answer: "Yes, our website inventory is synced in real-time with availability." },
    { id: 3, question: "Can I save my favorite cars?", answer: "Absolutely. You can favorite any car and revisit your list later." },
  ];

  const paymentFaqs = [
    { id: 4, question: "What are the payment options?", answer: "We accept credit/debit cards, UPI, net banking, and PayPal." },
    { id: 5, question: "Is there a deposit required?", answer: "A small refundable deposit is needed depending on the car category." },
    { id: 6, question: "How do I get my invoice?", answer: "Invoices are sent to your registered email and are downloadable from your dashboard." },
  ];

  return (
    <div className="relative bg-white text-[#101010]">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999]"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

         {/* Hero Section */}
          <div className="relative h-[40vh] md:h-[60vh] flex items-end bg-cover bg-center" style={{ backgroundImage: 'url(/contact-hero.jpg)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-white text-4xl sm:text-5xl font-bold px-6 py-10 md:p-10 italic"
            >
              FAQ <span className="text-[#ff6100]">|</span>
            </motion.h1>
          </div>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-16">
        {/* General Questions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">General Questions</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <img src="/bike.jpg" alt="bike" className="rounded-xl shadow-md" />
            <div>
              {generalFaqs.map((faq) => (
                <div key={faq.id} className="mb-4 border rounded-md">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 font-medium text-lg bg-gray-100 hover:bg-orange-100 transition-all"
                  >
                    {faq.question}
                  </button>
                  {active === faq.id && (
                    <div className="p-4 text-gray-700">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payments Related */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Payments Related</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              {paymentFaqs.map((faq) => (
                <div key={faq.id} className="mb-4 border rounded-md">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 font-medium text-lg bg-gray-100 hover:bg-orange-100 transition-all"
                  >
                    {faq.question}
                  </button>
                  {active === faq.id && (
                    <div className="p-4 text-gray-700">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
            <img src="/car-yellow.jpg" alt="yellow-car" className="rounded-xl shadow-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
