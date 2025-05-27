import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: "M20 8h-2l-2-4H8L6 8H4v8h16V8zM8 14H6v-2h2v2zm10 0h-2v-2h2v2z",
    value: "5000+",
    label: "Vehicles Rented"
  },
  {
    icon: "M12 4a8 8 0 100 16 8 8 0 000-16zm0 12a4 4 0 110-8 4 4 0 010 8z",
    value: "98%",
    label: "Customer Satisfaction"
  },
  {
    icon: "M3 3h18v18H3V3zm2 2v14h14V5H5z",
    value: "50+",
    label: "Cities Covered"
  },
  {
    icon: "M12 2a10 10 0 0110 10c0 4-6 9-10 9S2 16 2 12 8 3 12 3zm0 14a4 4 0 100-8 4 4 0 000 8z",
    value: "10+",
    label: "Years of Service"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const Stats = () => {
  return (
    <section className="py-16 bg-[#f4f5f7]">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Heading */}
        <p className="text-[#ff6100] text-sm tracking-widest mb-2">
          - EXPLORE OUR ACHIEVEMENTS -
        </p>
        <h2 className="text-4xl font-bold text-[#101010] mb-12">
          Trusted Vehicle Rental <br />
          Excellence with V-Ride
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-[#ffffff] p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(255, 97, 0, 0.2)',
                borderColor: '#ff6100'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <svg
                className="w-10 h-10 mx-auto mb-4 text-[#ff6100]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={stat.icon}
                />
              </svg>
              <motion.p
                className="text-3xl font-bold text-[#101010] mb-2"
                whileHover={{ color: '#ff6100' }}
              >
                {stat.value}
              </motion.p>
              <p className="text-[#101010]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
