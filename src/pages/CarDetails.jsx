// CarDetails.js (updated to use route params and shared data)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar, 
  FaGasPump, 
  FaUsers, 
  FaHeart, 
  FaRegHeart,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt
} from 'react-icons/fa';
import { GiCarKey, GiSteeringWheel, GiCarDoor } from 'react-icons/gi';
import { MdOutlineAirlineSeatReclineNormal, MdOutlineElectricCar } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from './Cars'; // Import the shared cars data

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    dropoffLocation: ''
  });
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Find the car with matching ID
    const foundCar = carsData.find(car => car.id === parseInt(carId));
    if (foundCar) {
      setCar(foundCar);
    } else {
      // Redirect to cars page if car not found
      navigate('/cars');
    }
  }, [carId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking submitted:', formData);
    setShowBookingForm(false);
    // Navigate to booking confirmation
    navigate(`/booking/${carId}/confirmation`, { state: { car, bookingDetails: formData } });
  };

  if (!car) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
     <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Car Images Gallery */}
      <div className="relative">
        <div className="h-96 md:h-[70vh] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={car.images[activeImage]}
              alt={car.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        
        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {car.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-orange-500' : 'border-transparent'}`}
            >
              <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-700 text-xl" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-bold">{car.name}</h1>
                <div className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-full">
                  <FaStar className="mr-1" />
                  <span>{car.rating}</span>
                  <span className="ml-1 text-sm">({car.reviews})</span>
                </div>
              </div>
              
              <p className="text-orange-500 text-2xl font-semibold my-4">
                ${car.price}<span className="text-gray-500 text-lg"> / day</span>
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Overview</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{car.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-2">
                        <FaCar className="text-orange-500 text-xs" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Specifications */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <GiSteeringWheel className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Transmission</p>
                    <p className="font-medium">{car.specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaGasPump className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Fuel Type</p>
                    <p className="font-medium">{car.specs.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineAirlineSeatReclineNormal className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Seats</p>
                    <p className="font-medium">{car.specs.seats}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GiCarDoor className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Doors</p>
                    <p className="font-medium">{car.specs.doors}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineElectricCar className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Drive Type</p>
                    <p className="font-medium">{car.specs.drive}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaShieldAlt className="text-2xl text-orange-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Vehicle Type</p>
                    <p className="font-medium">{car.specs.type}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-6">Book This Vehicle</h2>
              
              {!showBookingForm ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Daily Rate:</span>
                    <span className="font-bold">${car.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Security Deposit:</span>
                    <span className="font-bold">$500</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-gray-500">Total Estimate:</span>
                    <span className="text-orange-500 font-bold text-xl">${car.price + 500}</span>
                  </div>
                  
                  <button 
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors mt-6"
                  >
                    Reserve Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Pickup Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      <select
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Select location</option>
                        <option value="Downtown Office">Downtown Office</option>
                        <option value="Airport Terminal">Airport Terminal</option>
                        <option value="City Center">City Center</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Drop-off Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                      <select
                        name="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Select location</option>
                        <option value="Downtown Office">Downtown Office</option>
                        <option value="Airport Terminal">Airport Terminal</option>
                        <option value="City Center">City Center</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1">Pickup Date</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1">Return Date</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                    >
                      Confirm Reservation
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="w-full mt-2 text-gray-600 dark:text-gray-300 py-2 rounded-lg font-medium hover:text-gray-800 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;