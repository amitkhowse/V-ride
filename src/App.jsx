import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Cars from "./pages/Cars1";
// import CarDetails from "./pages/CarDetails";
// import Booking from "./pages/Booking";
import Services from "./pages/Services";
import Dealers from "./pages/pages/Dealers";
import Error404 from "./pages/pages/Error404";
import Gallery from "./pages/pages/Gallery";
import Plans from "./pages/pages/Plans";
import Team from "./pages/pages/Team";
import Testimonials from "./pages/pages/Testimonials";
import Blog from "./pages/Blog";
import Faq from "./pages/pages/Faq";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Cars />} />
        {/* <Route path="/cars/:carId" element={<CarDetails />} /> */}
        {/* <Route path="/booking/:carId" element={<Booking />} /> */}
        {/* <Route path="/booking/:carId/confirmation" element={<Booking />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
