import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const ContactUs = () => {
  // GSAP animations for hover effects
  useEffect(() => {
    // Animate contact info items on hover
    document.querySelectorAll('.contact-info-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 10,
          color: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(item.querySelector('.contact-icon'), {
          fill: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          color: '#ffffff',
          duration: 0.3,
          ease: 'power2.in'
        });
        gsap.to(item.querySelector('.contact-icon'), {
          fill: '#ffffff',
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });

    // Animate input fields on focus (simulated hover for visual effect)
    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          borderColor: '#ff6100',
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      input.addEventListener('blur', () => {
        gsap.to(input, {
          borderColor: '#101010',
          scale: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });

    // Animate "Send Message" button on hover
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.addEventListener('mouseenter', () => {
      gsap.to(sendBtn, {
        backgroundColor: '#ff6100',
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    sendBtn.addEventListener('mouseleave', () => {
      gsap.to(sendBtn, {
        backgroundColor: '#101010',
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  }, []);

  return (
    <section className="relative py-16 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        {/* Background Car Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-64 bg-gradient-to-b from-[#f4f5f7] to-[#101010] rounded-lg flex items-center justify-center">
            <p className="text-[#ff6100] text-2xl">[Car Image Placeholder]</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative bg-[#101010] rounded-lg py-10 px-8">
          {/* Heading */}
          <p className="text-[#ff6100] text-sm tracking-widest mb-2 text-center">
            - CONTACT US -
          </p>
          <h2 className="text-4xl font-bold text-[#ffffff] mb-12 text-center">
            Get In Touch With V-Ride
          </h2>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Contact Info */}
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-8">
              <h3 className="text-2xl font-semibold text-[#ffffff] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="contact-info-item flex items-center">
                  <svg className="contact-icon w-6 h-6 text-[#ffffff] mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5V8h14v10z"/>
                  </svg>
                  <div>
                    <p className="text-[#ffffff] font-semibold">Email Us</p>
                    <p className="text-[#ffffff]">support@vride.com</p>
                  </div>
                </div>
                <div className="contact-info-item flex items-center">
                  <svg className="contact-icon w-6 h-6 text-[#ffffff] mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.77 15.77 0 006.59 6.59l2.2-2.2a1 1 0 011.15-.24 11.54 11.54 0 003.55.85 1 1 0 011 1v3.5a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.54 11.54 0 00.85 3.55 1 1 0 01-.24 1.15l-2.2 2.2z"/>
                  </svg>
                  <div>
                    <p className="text-[#ffffff] font-semibold">Call Us</p>
                    <p className="text-[#ffffff]">+91 987-654-3210</p>
                  </div>
                </div>
                <div className="contact-info-item flex items-center">
                  <svg className="contact-icon w-6 h-6 text-[#ffffff] mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  <div>
                    <p className="text-[#ffffff] font-semibold">Visit Us</p>
                    <p className="text-[#ffffff]">123 V-Ride Avenue, Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:w-1/2 lg:pl-8">
              <h3 className="text-2xl font-semibold text-[#ffffff] mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-input w-full p-4 rounded-lg border-2 border-[#101010] focus:outline-none transition-all bg-[#ffffff] text-[#101010]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-input w-full p-4 rounded-lg border-2 border-[#101010] focus:outline-none transition-all bg-[#ffffff] text-[#101010]"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="form-input w-full p-4 rounded-lg border-2 border-[#101010] focus:outline-none transition-all bg-[#ffffff] text-[#101010]"
                ></textarea>
                <button className="send-btn bg-[#101010] text-[#ffffff] px-6 py-3 rounded-lg transition-all">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;