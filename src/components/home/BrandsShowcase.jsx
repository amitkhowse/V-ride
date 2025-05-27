import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import car from "../../assets/car.svg";
// Brands Showcase Component
import bmw from "../../assets/brands/bmw.png";
import ford from "../../assets/brands/ford.png";
import kia from "../../assets/brands/kia.png";
import mercedes from "../../assets/brands/mercedes.png";
import Volkswagen from "../../assets/brands/volkswagen.png";
import toyota from "../../assets/brands/toyota.png";
import renault from "../../assets/brands/renault.png";
import fiat from "../../assets/brands/fiat.png";
import volvo from "../../assets/brands/volvo.png";
import citroen from "../../assets/brands/citroen.png";
import nissan from "../../assets/brands/nissan.png";
import mini from "../../assets/brands/mini.png";
import porsche from "../../assets/brands/porsche.png";
import skoda from "../../assets/brands/skoda.png";
import hyundai from "../../assets/brands/Hyundai.png";


const brands = [
  bmw,
  ford,
  kia,
  mercedes,
  Volkswagen,
  toyota,
  renault,
  fiat,
  volvo,
  citroen,
  nissan,
  mini,
  porsche,
  skoda,
  hyundai,

];

export default function BrandsShowcase() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - bounds.left - bounds.width / 2);
    y.set(e.clientY - bounds.top - bounds.height / 2);
  };

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <motion.div
        className="relative max-w-7xl mx-auto z-10 px-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Interactive Card */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="bg-orange-500 rounded-[100px] py-10 px-8 md:px-14 flex flex-col md:flex-row justify-between items-center text-white relative z-10 cursor-pointer hover:shadow-2xl transition"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Left Text */}
          <motion.div
            className="text-center md:text-left mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="uppercase tracking-widest text-sm font-medium mb-2">
              - Car Brands -
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
              Explore Our Premium <br /> Car Collection
            </h2>
          </motion.div>

          {/* Center Car Image with Tilt */}
          <motion.img
            src={car}
            alt="car"
            className="w-[30px] md:w-[60px] relative z-10 mx-10 my-6 pointer-events-none"
            style={{ rotateX, rotateY, x, y }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          />

          {/* Right Button */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition">
              VIEW ALL BRANDS
            </button>
          </motion.div>
        </motion.div>

        {/* Brand Logos Marquee */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Marquee speed={40} gradient={false}>
            {brands.map((logo, idx) => (
              <motion.img
                key={idx}
                src={logo}
                alt={`brand-${idx}`}
                className="h-12 mx-8 opacity-60 hover:opacity-100 transition duration-300"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </Marquee>
        </motion.div>
      </motion.div>
    </section>
  );
}
