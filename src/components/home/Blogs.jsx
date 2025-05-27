import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import blog1 from "../../assets/blogs/blog1.jpg";
import blog2 from "../../assets/blogs/blog2.jpg";
import blog3 from "../../assets/blogs/blog3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Luxury Cars for Your Next Road Trip",
    excerpt: "Explore the best premium rides to elevate your travel experience.",
    date: "May 23, 2025",
    author: "Amit Khowse",
    image: blog1,
    category: "Luxury",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Choose the Right Vehicle for City Driving",
    excerpt: "Compact or electric? Here's what suits the urban roads best.",
    date: "May 19, 2025",
    author: "Priya Sharma",
    image: blog2,
    category: "Urban",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Rise of Electric Rentals in 2025",
    excerpt: "Electric vehicles are reshaping the rental industry—learn how.",
    date: "May 10, 2025",
    author: "Karan Malhotra",
    image: blog3,
    category: "Electric",
    readTime: "6 min read",
  },
];

export default function HomeBlogSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
  };

  return (
    <section 
      className="py-16 px-4 sm:px-6 bg-gray-50 dark:bg-[#0d0d0d] relative"
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

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Latest <span className="text-[#ff6100]">Blog Posts</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover our newest articles about vehicle trends and travel tips.
          </motion.p>
        </div>

        {/* Blog Posts Grid - Showing only 3 latest posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#1a1a1a] cursor-pointer group"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <span className="absolute top-3 right-3 bg-[#ff6100] text-white text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff6100] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-[#ff6100] font-medium group-hover:underline">
                    Read More <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/blog">
            <motion.button
              className="px-8 py-3 bg-[#ff6100] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              View All Articles
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}