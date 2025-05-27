import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const headerRef = useRef(null);
  const location = useLocation();

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Cars", path: "/cars" },
    { name: "Services", path: "/services" },
    {
      name: "Pages",
      subLinks: [
        { name: "Dealers", path: "/dealers" },
        { name: "Gallery", path: "/gallery" },
        { name: "Plans", path: "/plans" },
        { name: "Team", path: "/team" },
        { name: "FAQ", path: "/faq" },
        { name: "Testimonials", path: "/testimonials" },
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      ref={headerRef}
      className="fixed w-full z-50 bg-white/90 backdrop-blur-md transition-all duration-300 shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with hover animation */}
          <Link 
            to="/" 
            className="flex items-center group"
            onMouseEnter={() => setHoveredLink('logo')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <motion.span 
              className="text-2xl font-bold text-gray-900"
              animate={{
                scale: hoveredLink === 'logo' ? 1.05 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <motion.span 
                className="text-orange-500"
                animate={{
                  x: hoveredLink === 'logo' ? [0, 2, -2, 0] : 0,
                  transition: { duration: 0.4 }
                }}
              >V</motion.span>RIDE
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <div key={item.name} className="relative">
                {item.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => setHoveredLink(item.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors font-medium relative"
                    >
                      <motion.span
                        animate={{
                          color: activeDropdown === item.name || hoveredLink === item.name ? '#f97316' : '#374151',
                          transition: { duration: 0.2 }
                        }}
                      >
                        {item.name}
                      </motion.span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.name ? 180 : 0,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                      
                      {/* Underline animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredLink === item.name || activeDropdown === item.name ? '100%' : 0,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              duration: 0.2,
                              ease: "easeOut"
                            } 
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: 10,
                            transition: { 
                              duration: 0.15,
                              ease: "easeIn"
                            } 
                          }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-100"
                          onMouseEnter={() => setHoveredLink(item.name)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          {item.subLinks.map((subItem) => (
                            <motion.div
                              key={subItem.name}
                              whileHover={{ 
                                backgroundColor: '#fff7ed',
                                transition: { duration: 0.1 }
                              }}
                            >
                              <Link
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-500 transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onMouseEnter={() => setHoveredLink(item.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative font-medium ${
                      location.pathname === item.path ? 'text-orange-500' : 'text-gray-700'
                    }`}
                  >
                    <motion.span
                      animate={{
                        color: hoveredLink === item.name ? '#f97316' : 
                              location.pathname === item.path ? '#f97316' : '#374151',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredLink === item.name || location.pathname === item.path ? '100%' : 0,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button with animation */}
          <motion.button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              } 
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                duration: 0.25,
                ease: "easeIn"
              } 
            }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((item) => (
                <div key={item.name}>
                  {item.subLinks ? (
                    <>
                      <motion.button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-orange-500"
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={activeDropdown === item.name ? 'text-orange-500' : ''}>
                          {item.name}
                        </span>
                        <motion.div
                          animate={{
                            rotate: activeDropdown === item.name ? 180 : 0,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: 'auto',
                              transition: { 
                                duration: 0.2,
                                ease: "easeOut"
                              } 
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0,
                              transition: { 
                                duration: 0.15,
                                ease: "easeIn"
                              } 
                            }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.subLinks.map((subItem) => (
                              <motion.div
                                key={subItem.name}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className="block py-2 text-sm text-gray-600 hover:text-orange-500"
                                >
                                  {subItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Link
                        to={item.path}
                        className={`block py-2 text-gray-700 hover:text-orange-500 ${
                          location.pathname === item.path ? 'text-orange-500' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;