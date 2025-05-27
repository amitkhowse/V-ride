// Booking.js (new component)
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { carsData } from './Cars';

const Booking = () => {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    // If coming from CarDetails with state
    if (location.state) {
      setCar(location.state.car);
      setBookingDetails(location.state.bookingDetails);
    } else {
      // Find the car with matching ID
      const foundCar = carsData.find(car => car.id === parseInt(carId));
      if (foundCar) {
        setCar(foundCar);
      } else {
        // Redirect to cars page if car not found
        navigate('/cars');
      }
    }
  }, [carId, location.state, navigate]);

  if (!car) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{car.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full rounded-lg"
            />
          </div>
          
          <div>
            {bookingDetails ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Booking Details</h3>
                <div className="space-y-2">
                  <p><strong>Pickup Location:</strong> {bookingDetails.pickupLocation}</p>
                  <p><strong>Drop-off Location:</strong> {bookingDetails.dropoffLocation}</p>
                  <p><strong>Pickup Date:</strong> {bookingDetails.pickupDate}</p>
                  <p><strong>Return Date:</strong> {bookingDetails.returnDate}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily Rate:</span>
                      <span>${car.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span>$500</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total:</span>
                      <span>${car.price + 500}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-6">
                  Confirm & Pay
                </button>
              </div>
            ) : (
              <div>
                <p>Please complete the booking form on the car details page.</p>
                <button 
                  onClick={() => navigate(`/cars/${carId}`)}
                  className="mt-4 text-orange-500 hover:underline"
                >
                  Back to Car Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;