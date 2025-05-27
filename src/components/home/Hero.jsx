import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaCar, FaShuttleVan, FaBus, FaMotorcycle } from "react-icons/fa";
import { PiCarProfileFill } from "react-icons/pi";
import car from "../../assets/car2.svg"

const vehicleTabs = [
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Van", icon: <FaShuttleVan size={20} /> },
  { label: "Minibus", icon: <FaBus size={20} /> },
  { label: "Coupe", icon: <PiCarProfileFill size={20} /> },
  { label: "Bike", icon: <FaMotorcycle size={20} /> },
];

export default function Hero() {
  const [selectedTab, setSelectedTab] = useState("Car");
  const [carModels, setCarModels] = useState([]);
  const [formData, setFormData] = useState({
    vehicleType: "",
    pickupLocation: "",
    dropoffLocation: "",
    model: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: ""
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  useEffect(() => {
    const models = {
      Car: ["Mercedes E-Class", "Audi A6", "BMW 5 Series"],
      Van: ["Mercedes Vito", "Ford Transit", "Volkswagen Caravelle"],
      Minibus: ["Mercedes Sprinter", "Ford Tourneo", "Volkswagen Transporter"],
      Coupe: ["Mercedes C-Class Coupe", "Audi A5", "BMW 4 Series"],
      Bike: ["Harley Davidson", "BMW R 1250 GS", "Ducati Panigale"]
    };
    setCarModels(models[selectedTab] || []);
    setFormData(prev => ({ ...prev, vehicleType: selectedTab, model: "" }));
  }, [selectedTab]);

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left - bounds.width / 2);
    y.set(e.clientY - bounds.top - bounds.height / 2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="relative bg-[#101010] text-white overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-0" />

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row justify-between items-center relative z-10 w-full">

        {/* === Left Content === */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 space-y-10 z-10 relative"
        >
          {/* Headline */}
          <div className="max-w-lg">
            <p className="text-mg uppercase tracking-[0.3em] md:-rotate-90 text-orange-500 md:relative  md:-left-72 top-0 font-semibold mb-2">
              Premium Rentals
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Wide Range of <br />
              <span className="text-orange-500">Luxury Vehicles</span>
            </h1>
            <p className="mt-4 text-gray-300">
              Experience the finest selection of premium cars and bikes available for rent at competitive prices.
            </p>
          </div>

          {/* === Booking Form === */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-2xl max-w-xl"
          >
            <p className="text-black font-semibold mb-4 text-lg">Available For Rent</p>

            {/* Vehicle Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {vehicleTabs.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedTab(label)}
                  className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg min-w-[80px] transition-all duration-300 ${
                    selectedTab === label
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <div className="text-xl">{icon}</div>
                  <span className="text-xs mt-1 font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="md:col-span-2">
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 text-black px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select {selectedTab} Model</option>
                  {carModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              {["pickupLocation", "dropoffLocation"].map((name, i) => (
                <div key={i}>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
                    placeholder={name.replace("Location", " Location").replace(/([a-z])([A-Z])/g, '$1 $2')}
                    required
                  />
                </div>
              ))}
              {["pickupDate", "pickupTime", "returnDate", "returnTime"].map((name, i) => (
                <div key={i}>
                  <input
                    name={name}
                    type={name.includes("Date") ? "date" : "time"}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 text-black px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg"
            >
              FIND A VEHICLE
            </button>
          </motion.form>
        </motion.div>

        {/* === Right Vehicle Image & Price Tag === */}
        <motion.div
          className="relative lg:w-1/2 mt-16 lg:mt-0 flex justify-center min-h-[400px] lg:min-h-[600px]"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Orange BG */}
          <div className="absolute right-0 top-0 bg-gradient-to-b from-orange-500 to-transparent w-80 h-full z-0 rounded-l-[80px] opacity-80" />

          {/* Label & Price */}
          <div className="absolute right-10 top-10 z-10 text-right">
            <h2 className="text-6xl lg:text-7xl font-extrabold text-orange-700 opacity-20 tracking-tighter">
              {selectedTab.toUpperCase()}
            </h2>
            <div className="bg-black px-6 py-3 inline-block mt-2 rounded-lg shadow-lg">
              <p className="text-white text-sm leading-tight">
                PREMIUM {selectedTab.toUpperCase()} <br />
                <span className="text-orange-500 text-2xl font-bold">FROM $800</span> / DAY
              </p>
            </div>
          </div>

          {/* Vehicle Image with tilt */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative z-10 w-full max-w-lg pointer-events-none"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* <img */}
              {/* src={car} */}
              {/* src={`/images/${selectedTab.toLowerCase()}-hero.png`} */}
              {/* alt={selectedTab} */}
              {/* className="w-full h-auto object-contain" */}
            {/* /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
