import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cities from './pages/City';
import "./App.css";
import Home from './pages/Home';
import Airport from './pages/Airport';
import AirportDetails from './pages/AirportDetails';
import Passenger from './pages/Passenger';
import Aircraft from './pages/Aircraft';
import Flight from './pages/Flight';
import Gate from './pages/Gate';

function App() {
  return (
    <Router>
      <div id="top">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/airports" element={<Airport />} />
          <Route path="/airports/:id" element={<AirportDetails />} />
          <Route path="/passengers" element={<Passenger />} />
          <Route path="/aircrafts" element={<Aircraft />} />
          <Route path="/flights" element={<Flight />} />
          <Route path="/gates" element={<Gate />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
