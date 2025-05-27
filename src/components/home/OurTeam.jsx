import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';

// Note: Ensure react-slick is included in your project
// Add to your index.html head:
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

const OurTeam = () => {
  // Fresh team members for V-Ride
  const teamMembers = [
    {
      name: "Vikram Rao",
      role: "Founder & CEO",
    },
    {
      name: "Ananya Sharma",
      role: "Chief Operations Officer",
    },
    {
      name: "Rahul Kapoor",
      role: "Head of Customer Support",
    },
    {
      name: "Neha Desai",
      role: "Marketing Director",
    },
    {
      name: "Arjun Patel",
      role: "Fleet Manager",
    }
  ];

  // Slider settings to match the image layout
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
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
    document.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 10px 20px rgba(255, 97, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.team-name'), {
          color: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.team-role'), {
          color: '#ff6100',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.in'
        });
        gsap.to(card.querySelector('.team-name'), {
          color: '#101010',
          duration: 0.3,
          ease: 'power2.in'
        });
        gsap.to(card.querySelector('.team-role'), {
          color: '#101010',
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });
  }, []);

  return (
    <section className="py-16 bg-[#f4f5f7]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <p className="text-[#ff6100] text-sm tracking-widest mb-2 text-center">
          - OUR TEAM -
        </p>
        <h2 className="text-4xl font-bold text-[#101010] mb-12 text-center">
          Meet the V-Ride Team
        </h2>

        {/* Slider */}
        <Slider {...settings} className="px-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="px-4">
              <div className="team-card bg-[#ffffff] rounded-lg shadow-md overflow-hidden transition-all">
                {/* Team Member Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-b from-[#f4f5f7] to-[#101010] flex items-center justify-center">
                  <p className="text-[#ff6100] text-sm">[Team Member Image]</p>
                </div>
                {/* Team Member Info */}
                <div className="p-6 text-center">
                  <h3 className="team-name text-lg font-semibold text-[#101010] mb-2">{member.name}</h3>
                  <p className="team-role text-[#101010]">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OurTeam;