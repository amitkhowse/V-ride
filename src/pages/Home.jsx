import React from 'react'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import BrandsShowcase from '../components/home/BrandsShowcase'
import AboutShowcase from '../components/home/AboutShowcase'
import Features from '../components/home/Features'
import Vehicles from '../components/home/Vehicles'
import Testimonials from '../components/home/Testimonials'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ContactUs from '../components/home/ContactUs'
import VehicleCategories from '../components/home/VehicleCategories'
import OurTeam from '../components/home/OurTeam'
import Blogs from '../components/home/Blogs'
import WorkingSteps from '../components/home/WorkingSteps'

function Home() {
  return (
    <>
    <Hero />
    <Stats />
    <BrandsShowcase />
    <AboutShowcase />
    <Features />
    <Vehicles />
    <WhyChooseUs />
    <VehicleCategories />
    <WorkingSteps />
    <Blogs />
    <OurTeam />
    <Testimonials />
    <ContactUs />
    </>
  )
}

export default Home