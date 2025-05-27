import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FaCar, 
  FaGasPump, 
  FaUsers, 
  FaHeart, 
  FaRegHeart,
  FaStar,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaEye
} from 'react-icons/fa';
import { GiSteeringWheel, GiCarDoor } from 'react-icons/gi';
import { MdOutlineElectricCar } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

/// Sample car data
const carsData = [
  {
    id: 1,
    name: 'Mercedes-AMG GT',
    price: 950,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    seats: 2,
    bags: 1,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '469 HP',
    type: 'Sports Coupe',
    rating: 4.9,
    year: 2023,
    features: ['Premium Sound', 'Heated Seats', 'Navigation']
  },
  {
    id: 2,
    name: 'BMW X5 M',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 5,
    bags: 3,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '600 HP',
    type: 'Luxury SUV',
    rating: 4.7,
    year: 2023,
    features: ['Leather Interior', 'Panoramic Sunroof', 'Adaptive Cruise Control']
  },
  {
    id: 3,
    name: 'Audi R8 V10',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 2,
    bags: 1,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '562 HP',
    type: 'Supercar',
    rating: 4.8,
    year: 2023,
    features: ['Bang & Olufsen Sound', 'Carbon Fiber Trim', 'Navigation']
  },
  {
    id: 4,
    name: 'Tesla Model S Plaid',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1611095561642-8f1c3b5d6e7a',
    seats: 5,
    bags: 2,
    fuel: 'Electric',
    transmission: 'Automatic',
    power: '1020 HP',
    type: 'Electric Sedan',
    rating: 4.9,
    year: 2023,
    features: ['Autopilot', 'Premium Connectivity', 'All-Wheel Drive']
  },
  {
    id: 5,
    name: 'Lamborghini Huracán EVO',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 2,
    bags: 1,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '630 HP',
    type: 'Supercar',
    rating: 4.9,
    year: 2023,
    features: ['Navigation', 'Leather Interior', 'Performance Mode']
  },
  {
    id: 6,
    name: 'Range Rover Sport SVR',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 5,
    bags: 4,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '575 HP',
    type: 'Luxury SUV',
    rating: 4.6,
    year: 2023,
    features: ['Heated Seats', 'Adaptive Suspension', 'Navigation']
  },
  {
    id: 7,
    name: 'Ford Mustang GT500',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 4,
    bags: 2,
    fuel: 'Premium Unleaded',
    transmission: 'Manual',
    power: '760 HP',
    type: 'Muscle Car',
    rating: 4.8,
    year: 2023,
    features: ['Brembo Brakes', 'Sport Exhaust', 'Navigation']
  },
  {
    id: 8,
    name: 'Jaguar F-Type R',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 2,
    bags: 1,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '575 HP',
    type: 'Sports Coupe',
    rating: 4.7,  
    year: 2023,
    features: ['Leather Seats', 'Navigation', 'Premium Sound']
  },
  {
    id: 9,
    name: 'Chevrolet Corvette Stingray',  
    price: 1150,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 2,
    bags: 1,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '495 HP',
    type: 'Sports Coupe',
    rating: 4.8,
    year: 2023,
    features: ['Performance Exhaust', 'Leather Interior', 'Navigation']
  },
  {
    id: 10,
    name: 'Maserati Levante',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 5,
    bags: 3,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '345 HP',
    type: 'Luxury SUV',
    rating: 4.6,
    year: 2023,
    features: ['Leather Seats', 'Navigation', 'Adaptive Cruise Control']
  },
  {
    id: 11,
    name: 'Ferrari Portofino M',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    seats: 4,
    bags: 2,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '612 HP',
    type: 'Convertible Sports Car',
    rating: 4.9,
    year: 2023,
    features: ['Navigation', 'Leather Interior', 'Performance Mode']
  },
  {
    id: 12,
    name: 'Porsche 911 Turbo S',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833',
    seats: 4,
    bags: 2,
    fuel: 'Premium Unleaded',
    transmission: 'Automatic',
    power: '640 HP',
    type: 'Sports',
    rating: 4.8,
    year: 2023,
    features: ['Premium Sound', 'Sport Seats', 'Navigation']
  }
];
const Cars = () => {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    transmission: '',
    carType: ''
  });
  const controls = useAnimation();

  // Filter cars based on search and filters
  useEffect(() => {
    let results = carsData;
    
    if (searchTerm) {
      results = results.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      results = results.filter(car => car.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      results = results.filter(car => car.price <= Number(filters.maxPrice));
    }
    
    if (filters.transmission) {
      results = results.filter(car => 
        car.transmission.toLowerCase() === filters.transmission.toLowerCase()
      );
    }
    
    if (filters.carType) {
      results = results.filter(car => 
        car.type.toLowerCase().includes(filters.carType.toLowerCase())
      );
    }
    
    setFilteredCars(results);
  }, [searchTerm, filters]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      transmission: '',
      carType: ''
    });
    setSearchTerm('');
  };

  const viewCarDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const bookCar = (carId) => {
    navigate(`/booking/${carId}`);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494972308805-463bc619d34e')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div 
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Premium</span> Fleet
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Choose from our exclusive collection of luxury and performance vehicles
          </p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center md:justify-start gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
            >
              <FaFilter />
              Filters
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Price</label>
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="$0"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Price</label>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="$2000"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Transmission</label>
                    <select
                      name="transmission"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.transmission}
                      onChange={handleFilterChange}
                    >
                      <option value="">Any</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Car Type</label>
                    <input
                      type="text"
                      name="carType"
                      placeholder="SUV, Sports, etc."
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.carType}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={resetFilters}
                    className="text-orange-500 hover:text-orange-700 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredCars.length} of {carsData.length} vehicles
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 dark:text-gray-300">Sort by:</span>
            <select className="border rounded-lg px-3 py-1">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <button 
                    onClick={() => toggleFavorite(car.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm"
                  >
                    {favorites.includes(car.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600 hover:text-red-500" />
                    )}
                  </button>
                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${car.price}<span className="text-xs">/day</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <div className="flex items-center text-amber-400">
                      <FaStar className="mr-1" />
                      <span className="text-gray-700 dark:text-gray-300">{car.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-orange-500" />
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center">
                      <GiSteeringWheel className="mr-2 text-orange-500" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center">
                      <FaGasPump className="mr-2 text-orange-500" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineElectricCar className="mr-2 text-orange-500" />
                      <span>{car.power}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => viewCarDetails(car.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors"
                    >
                      <FaEye /> View
                    </button>
                    <button 
                      onClick={() => bookCar(car.id)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h3 className="text-xl font-medium mb-2">No vehicles found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={resetFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${page === 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;