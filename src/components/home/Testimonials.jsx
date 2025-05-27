import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';

// Note: Ensure react-slick is included in your project
// Add to your index.html head:
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

const Testimonials = () => {
  // Fresh testimonials for V-Ride
  const testimonials = [
    {
      name: "Amit Sharma",
      feedback: "Renting a bike from V-Ride was a breeze! The process was seamless, and the bike was in top condition. I had an amazing weekend exploring the city!",
      role: "Bike Enthusiast",
      rating: 5
    },
    {
      name: "Priya Kapoor",
      feedback: "I needed a car for a business trip, and V-Ride delivered beyond my expectations. Their customer support was exceptional, and the car was spotless.",
      role: "Corporate Traveler",
      rating: 4
    },
    {
      name: "Rohan Desai",
      feedback: "V-Ride’s premium fleet is impressive! I rented a luxury car for a special occasion, and it made the day unforgettable. Highly recommend their services!",
      role: "Event Planner",
      rating: 5
    },
    {
      name: "Sneha Patel",
      feedback: "The flexibility of V-Ride’s rental plans saved my vacation. I could easily extend my rental, and their roadside support was a lifesaver when I needed it.",
      role: "Adventurer",
      rating: 5
    }
  ];

  // Slider settings to match the image layout
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // GSAP animations for hover effects
  useEffect(() => {
    document.querySelectorAll('.testimonial-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 10px 20px rgba(255, 97, 0, 0.2)',
          borderColor: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.user-name'), {
          color: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderColor: '#ffffff',
          duration: 0.3,
          ease: 'power2.in'
        });
        gsap.to(card.querySelector('.user-name'), {
          color: '#101010',
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });
  }, []);

  return (
    <section className="py-16 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <p className="text-[#ff6100] text-sm tracking-widest mb-2 text-center">
          - TESTIMONIALS -
        </p>
        <h2 className="text-4xl font-bold text-[#101010] mb-12 text-center">
          What Our Customers Are Saying
        </h2>

        {/* Slider */}
        <Slider {...settings} className="px-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="testimonial-card bg-[#ffffff] p-6 rounded-lg shadow-md border-2 border-[#ffffff] transition-all">
                {/* Quote Icon */}
                <svg className="w-8 h-8 text-[#ff6100] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h6v-6h6v6h6V3H3zm6 12H6v-6h3v6zm9 0h-3v-6h3v6z"/>
                </svg>
                {/* Feedback */}
                <p className="text-[#101010] mb-4">{testimonial.feedback}</p>
                {/* User Info */}
                <div className="flex items-center">
                  <div className="bg-gradient-to-b from-[#f4f5f7] to-[#101010] rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <p className="text-[#ff6100] text-sm">[User Image]</p>
                  </div>
                  <div>
                    <h3 className="user-name text-lg font-semibold text-[#101010]">{testimonial.name}</h3>
                    <p className="text-[#101010] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                {/* Rating */}
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#ff6100]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;