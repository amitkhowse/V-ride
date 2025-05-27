import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaCar, FaGasPump, FaUsers, FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsSpeedometer2, BsFillStarFill } from 'react-icons/bs';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Premium vehicle data
const cars = [
  { id: 1, name: 'Mercedes-AMG GT', price: 950, type: 'Luxury', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '469 HP', rating: 4.9, year: 2023, img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e' },
      { id: 2, name: 'BMW M8 Competition', price: 1100, type: 'Luxury', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '617 HP', rating: 4.8, year: 2023, img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d' },
      { id: 3, name: 'Audi R8 V10', price: 1200, type: 'Sports', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '562 HP', rating: 4.9, year: 2023, img: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5' },
      { id: 4, name: 'Porsche 911 Turbo S', price: 1500, type: 'Sports', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '640 HP', rating: 5.0, year: 2023, img: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833' },
      { id: 5, name: 'Lamborghini Huracan', price: 1800, type: 'Super', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '631 HP', rating: 4.9, year: 2023, img: 'https://images.unsplash.com/photo-1544620347-c4fd8a3b1193' },
      { id: 6, name: 'Ferrari 488 GTB', price: 2000, type: 'Super', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '661 HP', rating: 4.9, year: 2022, img: 'https://images.unsplash.com/photo-1606220838315-056192d5e927' },
      { id: 7, name: 'McLaren 720S', price: 2200, type: 'Super', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '710 HP', rating: 4.8, year: 2023, img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537' },
      { id: 8, name: 'Rolls-Royce Wraith', price: 2500, type: 'Ultra Luxury', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '624 HP', rating: 4.7, year: 2022, img: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1' },
      { id: 9, name: 'Bentley Continental GT', price: 1600, type: 'Luxury', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '542 HP', rating: 4.7, year: 2023, img: 'https://images.unsplash.com/photo-1601430854328-26d0d524344a' },
      { id: 10, name: 'Aston Martin DB11', price: 1400, type: 'Luxury', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '503 HP', rating: 4.6, year: 2022, img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39' },
      { id: 11, name: 'Tesla Model S Plaid', price: 1100, type: 'Electric', seats: 5, fuel: 'Electric', transmission: 'Automatic', power: '1020 HP', rating: 4.9, year: 2023, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7' },
      { id: 12, name: 'Range Rover SVAutobiography', price: 1300, type: 'Luxury SUV', seats: 5, fuel: 'Petrol', transmission: 'Automatic', power: '557 HP', rating: 4.6, year: 2023, img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027' },
      { id: 13, name: 'Jeep Wrangler Rubicon', price: 750, type: 'Off-Road', seats: 5, fuel: 'Petrol', transmission: 'Manual', power: '285 HP', rating: 4.4, year: 2023, img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc' },
      { id: 14, name: 'Ford Mustang Shelby GT500', price: 950, type: 'Muscle', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '760 HP', rating: 4.7, year: 2023, img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d' },
      { id: 15, name: 'Chevrolet Corvette Stingray', price: 850, type: 'Sports', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '495 HP', rating: 4.6, year: 2023, img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888' },
      { id: 16, name: 'Dodge Challenger SRT Hellcat', price: 900, type: 'Muscle', seats: 5, fuel: 'Petrol', transmission: 'Automatic', power: '717 HP', rating: 4.5, year: 2023, img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8' },
      { id: 17, name: 'Lexus LC 500', price: 950, type: 'Luxury', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '471 HP', rating: 4.6, year: 2023, img: 'https://images.unsplash.com/photo-1550355291-bbee04a92027' },
      { id: 18, name: 'Nissan GT-R Nismo', price: 1100, type: 'Sports', seats: 4, fuel: 'Petrol', transmission: 'Automatic', power: '600 HP', rating: 4.7, year: 2023, img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b' },
      { id: 19, name: 'Jaguar F-Type R', price: 1000, type: 'Sports', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '575 HP', rating: 4.5, year: 2023, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7' },
      { id: 20, name: 'Maserati MC20', price: 1700, type: 'Super', seats: 2, fuel: 'Petrol', transmission: 'Automatic', power: '621 HP', rating: 4.8, year: 2023, img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537' }
];

const Cars = () => {
  const [carList, setCarList] = useState(cars);
  const [hoveredCar, setHoveredCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const controls = useAnimation();

  // Custom cursor state and effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: '#ff6100',
      borderRadius: '100%',
      mixBlendMode: 'difference',
      transition: { type: 'spring', damping: 20, stiffness: 300 },
    },
    card: {
      height: 120,
      width: 120,
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      backgroundColor: 'rgba(255, 97, 0, 0.2)',
      backdropFilter: 'blur(4px)',
      transition: { type: 'spring', damping: 15, stiffness: 200 },
    },
    button: {
      height: 60,
      width: 60,
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      backgroundColor: '#ff6100',
      transition: { type: 'spring', damping: 15, stiffness: 200 },
    },
    text: {
      height: 80,
      width: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: '#fff',
      mixBlendMode: 'difference',
      transition: { type: 'spring', damping: 15, stiffness: 200 },
    }
  };

  const cardEnter = () => setCursorVariant('card');
  const buttonEnter = () => setCursorVariant('button');
  const textEnter = () => setCursorVariant('text');
  const resetCursor = () => setCursorVariant('default');

  // GSAP animations for scroll effects
  useEffect(() => {
    gsap.utils.toArray('.car-card').forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    });
  }, []);

  const handleMouseMove = (e, id) => {
    setHoveredCar(id);
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * 10;
    controls.start({
      rotateX: -y,
      rotateY: x,
      transition: { duration: 0.2 },
    });
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="relative font-sans bg-gray-50 cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div 
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              onMouseEnter={textEnter}
              onMouseLeave={resetCursor}
            >
              PREMIUM <span className="text-[#ff6100]">LUXURY</span> RENTALS
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
              onMouseEnter={textEnter}
              onMouseLeave={resetCursor}
            >
              Experience unparalleled comfort and performance with our exclusive collection
            </motion.p>
            <motion.button
              className="bg-[#ff6100] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e55600] transition-colors flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={buttonEnter}
              onMouseLeave={resetCursor}
            >
              Explore Fleet <MdOutlineArrowForwardIos className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Car Grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onMouseEnter={textEnter}
              onMouseLeave={resetCursor}
            >
              Our <span className="text-[#ff6100]">Premium</span> Collection
            </motion.h2>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={buttonEnter}
                onMouseLeave={resetCursor}
              >
                <select className="appearance-none bg-white border px-4 py-2 pr-8 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6100]">
                  <option>Sort By: All Vehicles</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.button
                className="bg-[#ff6100] text-white px-4 py-2 rounded hover:bg-[#e55600] transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={buttonEnter}
                onMouseLeave={resetCursor}
              >
                <FaCar className="mr-2" /> Filters
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {carList.map((car) => (
              <motion.div
                key={car.id}
                className="car-card bg-white rounded-xl shadow-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
                onMouseMove={(e) => {
                  handleMouseMove(e, car.id);
                  cardEnter();
                }}
                onMouseLeave={() => {
                  setHoveredCar(null);
                  controls.start({ rotateX: 0, rotateY: 0, transition: { duration: 0.2 } });
                  resetCursor();
                }}
                custom={car.id}
                animate={controls}
                viewport={{ once: true }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={car.img}
                    alt={`Image of ${car.name}`}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredCar === car.id ? 1.05 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      className="p-2 bg-white/80 rounded-full backdrop-blur-sm shadow-sm"
                      onClick={() => toggleFavorite(car.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={buttonEnter}
                      onMouseLeave={cardEnter}
                    >
                      {favorites.includes(car.id) ? (
                        <FaHeart className="text-red-500 text-xl" />
                      ) : (
                        <FaRegHeart className="text-gray-400 text-xl hover:text-red-500 transition-colors" />
                      )}
                    </motion.button>
                  </div>
                  <div 
                    className="absolute bottom-4 left-4 bg-[#ff6100] text-white px-3 py-1 rounded-full text-sm font-semibold z-[2]"
                    onMouseEnter={buttonEnter}
                    onMouseLeave={cardEnter}
                  >
                    ${car.price}<span className="text-xs">/day</span>
                  </div>
                </div>
                
                <div className="p-5 space-y-3">
                  <div 
                    className="flex justify-between items-start"
                    onMouseEnter={textEnter}
                    onMouseLeave={cardEnter}
                  >
                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                    <div className="flex items-center text-amber-400">
                      <BsFillStarFill className="mr-1" />
                      <span className="text-sm font-semibold text-gray-700">{car.rating}</span>
                    </div>
                  </div>

                  <div 
                    className="grid grid-cols-2 gap-3 text-sm text-gray-600"
                    onMouseEnter={textEnter}
                    onMouseLeave={cardEnter}
                  >
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-[#ff6100]" />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center">
                      <BsSpeedometer2 className="mr-2 text-[#ff6100]" />
                      <span>{car.power}</span>
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="mr-2 text-[#ff6100]" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center">
                      <GiSteeringWheel className="mr-2 text-[#ff6100]" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span 
                      className="text-xs text-gray-500"
                      onMouseEnter={textEnter}
                      onMouseLeave={cardEnter}
                    >
                      Model: {car.year}
                    </span>
                    <motion.button 
                      className="text-[#ff6100] text-sm font-semibold flex items-center gap-1 hover:text-white hover:bg-[#ff6100] px-3 py-1 rounded-full transition-all duration-300 border border-[#ff6100] hover:border-transparent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={buttonEnter}
                      onMouseLeave={cardEnter}
                    >
                      Book Now 
                      <MdOutlineArrowForwardIos size={12} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredCar === car.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,97,0,0.1) 0%, transparent 70%)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <motion.button
              className="bg-[#ff6100] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#e55600] transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={buttonEnter}
              onMouseLeave={resetCursor}
            >
              Load More Vehicles <MdOutlineArrowForwardIos className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cars;