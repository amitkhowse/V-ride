import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  FaCar, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaGasPump,
  FaRoute,
  FaUserAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { GiCarKey, GiPathDistance } from 'react-icons/gi';

const fadeIn = (direction = 'up', delay = 0) => {
  return {
    initial: {
      y: direction === 'up' ? 40 : -40,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

const services = [
  {
    icon: <FaUserAlt className="text-3xl" />, 
    title: 'Personal Driver', 
    desc: 'Save contact of your favorite professional driver for future bookings',
    color: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: <GiCarKey className="text-3xl" />, 
    title: 'Pickup & Delivery', 
    desc: 'Real-time tracking for vehicle pickup and delivery services',
    color: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: <FaGasPump className="text-3xl" />, 
    title: 'Fuel Plans', 
    desc: 'Locate the nearest gas stations along your route',
    color: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    icon: <FaRoute className="text-3xl" />, 
    title: 'Smart Navigation', 
    desc: 'AI-powered route optimization for fastest travel times',
    color: 'bg-green-100 dark:bg-green-900/30'
  },
];

const additionalServices = [
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: 'Premium Insurance',
    desc: 'Comprehensive coverage options for peace of mind',
    color: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    icon: <GiPathDistance className="text-3xl" />,
    title: 'Unlimited Mileage',
    desc: 'Drive without worrying about distance limits',
    color: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    icon: <FaPhoneAlt className="text-3xl" />,
    title: '24/7 Support',
    desc: 'Always available customer service team',
    color: 'bg-indigo-100 dark:bg-indigo-900/30'
  }
];

const ServiceCard = ({ icon, title, desc, delay, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  
  const handleHover = () => {
    setIsHovered(true);
    controls.start({
      y: -5,
      transition: { duration: 0.3 }
    });
  };
  
  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({
      y: 0,
      transition: { duration: 0.3 }
    });
  };

  return (
    <motion.div 
      variants={fadeIn('up', delay)} 
      initial="initial" 
      whileInView="animate" 
      viewport={{ once: true, margin: "-100px" }}
      className={`p-8 rounded-2xl ${color} shadow-lg hover:shadow-xl transition-all duration-300`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      animate={controls}
    >
      <motion.div 
        className="text-orange-500 mb-6"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0
        }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="bg-[#f4f5f7] dark:bg-[#101010] text-[#101010] dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium <span className="text-orange-500">Services</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience unparalleled convenience with our exclusive service offerings
          </motion.p>
        </motion.div>
      </section>

      {/* Main Services */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-orange-500">Core</span> Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We go beyond just car rentals to provide a complete mobility experience with services designed for your comfort and convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <ServiceCard 
              key={`main-${i}`} 
              {...service} 
              delay={i * 0.1} 
            />
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-white dark:bg-[#1a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn()}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional <span className="text-orange-500">Benefits</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enjoy these complimentary services that make every rental experience exceptional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, i) => (
              <ServiceCard 
                key={`additional-${i}`} 
                {...service} 
                delay={i * 0.1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Experience Premium Service?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Book your vehicle today and enjoy our exceptional services
          </motion.p>
          <motion.button
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Book Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Services;