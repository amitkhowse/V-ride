import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiUser, FiSearch } from "react-icons/fi";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Luxury Cars for Your Next Road Trip",
    excerpt: "Explore the best premium rides to elevate your travel experience.",
    date: "May 23, 2025",
    author: "Amit Khowse",
    image: "/images/blog1.jpg",
    category: "Luxury",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Choose the Right Vehicle for City Driving",
    excerpt: "Compact or electric? Here's what suits the urban roads best.",
    date: "May 19, 2025",
    author: "Priya Sharma",
    image: "/images/blog2.jpg",
    category: "Urban",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Rise of Electric Rentals in 2025",
    excerpt: "Electric vehicles are reshaping the rental industry—learn how.",
    date: "May 10, 2025",
    author: "Karan Malhotra",
    image: "/images/blog3.jpg",
    category: "Electric",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Family Road Trip Essentials",
    excerpt: "Must-have items for a comfortable family journey.",
    date: "May 5, 2025",
    author: "Neha Patel",
    image: "/images/blog4.jpg",
    category: "Family",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Off-Road Adventure Vehicles",
    excerpt: "The toughest rides for your wilderness exploration.",
    date: "April 28, 2025",
    author: "Rahul Verma",
    image: "/images/blog5.jpg",
    category: "Adventure",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Budget-Friendly Rental Options",
    excerpt: "Quality vehicles that won't break the bank.",
    date: "April 20, 2025",
    author: "Sonia Gupta",
    image: "/images/blog6.jpg",
    category: "Budget",
    readTime: "3 min read",
  },
];

const categories = ["All", "Luxury", "Urban", "Electric", "Family", "Adventure", "Budget"];

export default function Blog() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      className="py-12 px-4 sm:py-16 bg-white text-[#101010] dark:bg-[#101010] dark:text-white relative overflow-hidden"
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
              <div className="relative h-[40vh] md:h-[40vh] flex items-end bg-cover bg-center" style={{ backgroundImage: 'url(/contact-hero.jpg)' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 text-white text-4xl sm:text-5xl font-bold px-6 py-10 md:p-10 italic"
                >
                  Latest <span className="text-[#ff6100]">Insights</span><span className="text-[#ff6100]">|</span>
                </motion.h1>
              </div>
      <div className="max-w-7xl mx-auto">
      
        {/* Search and Filter */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ff6100]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-[#ff6100] text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(category)}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl overflow-hidden shadow-md bg-gray-50 dark:bg-[#1a1a1a] cursor-pointer group"
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
              >
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
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center mr-4">
                      <FiCalendar className="mr-1" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-1" /> {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff6100] transition-colors">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                    <button className="flex items-center text-[#ff6100] font-medium group-hover:underline">
                      Read More <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              No articles found matching your criteria.
            </h3>
          </motion.div>
        )}

        {/* View More Button */}
        {filteredPosts.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-3 bg-[#ff6100] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              View All Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}