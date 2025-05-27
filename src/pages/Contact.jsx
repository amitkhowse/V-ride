import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  // Custom cursor state
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle hover states
  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  return (
    <div 
      className="font-sans text-[#101010] bg-white min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Custom Animated Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-[#ff6100] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
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
          CONTACT US <span className="text-[#ff6100]">|</span>
        </motion.h1>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 sm:p-6 md:p-10 gap-8 md:gap-10 items-start max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6100] to-[#101010]">Get In</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#101010] to-[#ff6100]">Touch</span>
          </h2>
          <ul className="space-y-4 text-base sm:text-lg">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#ff6100] min-w-[20px]" /> 456 789 1012
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#ff6100] min-w-[20px]" /> carntelinfo@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#ff6100] min-w-[20px]" /> 55/11 ronin tower New York
            </li>
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#f8f8f8] p-6 sm:p-8 rounded-lg shadow-md space-y-4 w-full"
        >
          <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          />
          <input 
            type="text" 
            placeholder="Phone" 
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          />
          <textarea 
            placeholder="Message" 
            rows="4" 
            className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-[#ff6100] transition-all"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          ></textarea>
          <motion.button 
            type="submit" 
            className="bg-black text-white py-3 px-6 rounded flex items-center gap-2 w-full justify-center hover:bg-[#ff6100] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          >
            Submit Now <FiSend />
          </motion.button>
        </motion.form>
      </div>

      {/* Map */}
      <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
        <iframe
          src="https://maps.google.com/maps?q=san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl border shadow"
          allowFullScreen=""
          loading="lazy"
          title="map"
        ></iframe>
      </div>

      {/* Branch Locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto text-sm">
        {['San Francisco', 'London', 'Chicago'].map((city, i) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="space-y-2 bg-[#f8f8f8] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          >
            <h4 className="font-semibold text-lg">{city}</h4>
            <p className="flex items-center gap-2 text-[#ff6100]"><FaPhoneAlt /> 456 789 1012</p>
            <p className="flex items-center gap-2"><FaEnvelope /> carntelinfo@gmail.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> {
              city === 'San Francisco' ? '329 Queensberry Street' :
              city === 'London' ? '25 Gordon Ave, London, ON N6J 2V8' :
              '853 W Blackhawk St, Chicago, IL 60642'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Contact;