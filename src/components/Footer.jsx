import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion'; // Added Framer Motion import

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const socialIcons = [
  { id: 'x', path: 'M18 6L6 18M6 6l12 12', label: 'X' },
  {
    id: 'facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    label: 'Facebook',
  },
  {
    id: 'instagram',
    path: 'M16.5 7.5v.001M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 110 10 5 5 0 010-10z',
    label: 'Instagram',
  },
  {
    id: 'pinterest',
    path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 018 8c0 3.3-2.2 6-5 6-1.1 0-2.1-.3-2.9-.9l1.5-5.6c.2-.7.6-1.3 1.1-1.8.8-.8 1.3-1.9 1.3-3.1 0-2.4-2-4.4-4.5-4.4s-4.5 2-4.5 4.4c0 1.2.5 2.3 1.3 3.1.2.2.3.5.2.8l-.6 2.3c-.1.3-.4.4-.6.3-1.8-.7-3.1-2.5-3.1-4.5 0-2.8 2.2-5 5-5s5 2.2 5 5z',
    label: 'Pinterest',
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const socialIconsRef = useRef([]);
  const linksRef = useRef([]);

  // GSAP animations
  useEffect(() => {
    // Footer entrance animation
    gsap.from(footerRef.current, {
      y: 50,
      // opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    });

    // Staggered animation for columns
    gsap.from('.footer-column', {
      y: 30,
      // opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom-=150',
        toggleActions: 'play none none none',
      },
    });

    // Social icons animation
    socialIconsRef.current.forEach((icon, i) => {
      if (icon) {
        gsap.from(icon, {
          scale: 0,
          // opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    // Link hover animations
    const handleLinkEnter = (link) => {
      gsap.to(link, {
        color: '#ff6100',
        x: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(link.querySelector('.link-arrow'), {
        opacity: 1,
        x: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLinkLeave = (link) => {
      gsap.to(link, {
        color: '#ffffff',
        x: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(link.querySelector('.link-arrow'), {
        // opacity: 0,
        x: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    // Social icon hover animations
    const handleIconEnter = (icon) => {
      gsap.to(icon, {
        scale: 1.1,
        backgroundColor: '#ff6100',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(icon.querySelector('svg'), {
        color: '#ffffff',
        duration: 0.3,
      });
    };

    const handleIconLeave = (icon) => {
      gsap.to(icon, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(icon.querySelector('svg'), {
        color: '#ff6100',
        duration: 0.3,
      });
    };

    // Attach event listeners
    linksRef.current.forEach((link) => {
      if (link) {
        link.addEventListener('mouseenter', () => handleLinkEnter(link));
        link.addEventListener('mouseleave', () => handleLinkLeave(link));
      }
    });

    socialIconsRef.current.forEach((icon) => {
      if (icon) {
        icon.addEventListener('mouseenter', () => handleIconEnter(icon));
        icon.addEventListener('mouseleave', () => handleIconLeave(icon));
      }
    });

    // Newsletter button animation
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
      gsap.from(newsletterBtn, {
        x: 20,
        // opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });
    }

    // Cleanup event listeners
    return () => {
      linksRef.current.forEach((link) => {
        if (link) {
          link.removeEventListener('mouseenter', () => handleLinkEnter(link));
          link.removeEventListener('mouseleave', () => handleLinkLeave(link));
        }
      });

      socialIconsRef.current.forEach((icon) => {
        if (icon) {
          icon.removeEventListener('mouseenter', () => handleIconEnter(icon));
          icon.removeEventListener('mouseleave', () => handleIconLeave(icon));
        }
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#101010] text-white py-16 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="footer-column">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#ff6100]">V</span>-Ride
          </motion.h2>
          <p className="text-[#b3b3b3] mb-6 leading-relaxed">
            Premium vehicle rentals with exceptional service since 2015. We offer the finest selection of luxury and performance vehicles.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start">
              <svg className="w-5 h-5 mt-1 mr-3 text-[#ff6100] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[#f4f5f7]">+1 (234) 654-0214</span>
            </div>

            <div className="flex items-start">
              <svg className="w-5 h-5 mt-1 mr-3 text-[#ff6100] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[#f4f5f7]">vrideinfo@gmail.com</span>
            </div>

            <div className="flex items-start">
              <svg className="w-5 h-5 mt-1 mr-3 text-[#ff6100] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[#f4f5f7]">55/71 Ronin Tower, New York</span>
            </div>
          </div>

          <div className="flex space-x-4">
            {socialIcons.map((icon, i) => (
              <a
                key={icon.id}
                href={`https://${icon.label.toLowerCase()}.com/vride`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 rounded-full border border-[#ff6100] transition-all hover:bg-[#ff6100] hover:border-transparent"
                ref={(el) => (socialIconsRef.current[i] = el)}
                aria-label={`Visit our ${icon.label} page`}
              >
                <svg className="w-5 h-5 text-[#ff6100] hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-[#333]">OPERATING HOURS</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#b3b3b3]">Monday - Friday</span>
              <span className="text-[#f4f5f7] font-medium">09:00 AM - 09:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b3b3b3]">Saturday</span>
              <span className="text-[#f4f5f7] font-medium">09:00 AM - 07:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#b3b3b3]">Sunday</span>
              <span className="text-[#f4f5f7] font-medium">Closed</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-[#333]">SUPPORT</h3>
            <div className="space-y-3">
              <a
                href="/contact"
                className="footer-link block text-[#f4f5f7] hover:text-[#ff6100] transition-colors duration-300"
                ref={(el) => el && linksRef.current.push(el)}
              >
                <span className="flex items-center">
                  Contact Us
                  <svg className="link-arrow w-4 h-4 ml-2 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a
                href="/faq"
                className="footer-link block text-[#f4f5f7] hover:text-[#ff6100] transition-colors duration-300"
                ref={(el) => el && linksRef.current.push(el)}
              >
                <span className="flex items-center">
                  FAQ
                  <svg className="link-arrow w-4 h-4 ml-2 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a
                href="/privacy"
                className="footer-link block text-[#f4f5f7] hover:text-[#ff6100] transition-colors duration-300"
                ref={(el) => el && linksRef.current.push(el)}
              >
                <span className="flex items-center">
                  Privacy Policy
                  <svg className="link-arrow w-4 h-4 ml-2 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-[#333]">QUICK LINKS</h3>
          <div className="space-y-3">
            {['About Us', 'Services', 'Our Fleet', 'Testimonials', 'Blog', 'Careers'].map((link, i) => (
              <a
                key={i}
                href={`/${link.toLowerCase().replace(' ', '-')}`}
                className="footer-link block text-[#f4f5f7] hover:text-[#ff6100] transition-colors duration-300"
                ref={(el) => el && linksRef.current.push(el)}
              >
                <span className="flex items-center">
                  {link}
                  <svg className="link-arrow w-4 h-4 ml-2 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Vehicle Types */}
        <div className="footer-column">
          <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-[#333]">VEHICLE TYPES</h3>
          <div className="grid grid-cols-2 gap-3">
            {['SUVs', 'Convertibles', 'Sedans', 'Sports Cars', 'Luxury Vehicles', 'Electric Cars', 'Motorcycles', 'Vans', 'Trucks'].map((type, i) => (
              <a
                key={i}
                href={`/vehicles/${type.toLowerCase().replace(' ', '-')}`}
                className="footer-link text-sm text-[#f4f5f7] hover:text-[#ff6100] transition-colors duration-300"
                ref={(el) => el && linksRef.current.push(el)}
              >
                <span className="flex items-center">
                  {type}
                  <svg className="link-arrow w-3 h-3 ml-1 opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-[#b3b3b3] mb-4 text-sm">Subscribe to get updates on new vehicles and special offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#1a1a1a] text-white px-4 py-3 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-[#ff6100]"
              />
              <button className="newsletter-btn bg-[#ff6100] text-white px-4 py-3 rounded-r hover:bg-[#e55600] transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-[#333] text-center text-[#b3b3b3] text-sm">
        <p>© {new Date().getFullYear()} V-Ride. All rights reserved. | Designed with passion in New York</p>
      </div>
    </footer>
  );
};

export default Footer;