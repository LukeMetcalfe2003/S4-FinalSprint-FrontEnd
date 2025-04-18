import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Flight = () => {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: '',
    departureCity: '',
    arrivalCity: '',
    departureTime: '',
    arrivalTime: '',
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:8080/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFlight = async () => {
    try {
      await axios.post('http://localhost:8080/flights', formData);
      setFormData({
        flightNumber: '',
        departureCity: '',
        arrivalCity: '',
        departureTime: '',
        arrivalTime: '',
      });
      fetchFlights();
    } catch (err) {
      console.error('Error adding flight:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/flights/${id}`);
      fetchFlights();
    } catch (err) {
      console.error('Error deleting flight:', err);
    }
  };

  return (
    <div className="flight-page-container">
      <div className="flight-page-header">
        <h1 className="flight-title">Flight Management</h1>
      </div>

      <div className="flight-form">
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={formData.flightNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="departureCity"
          placeholder="Departure City"
          value={formData.departureCity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="arrivalCity"
          placeholder="Arrival City"
          value={formData.arrivalCity}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleInputChange}
        />
        <button onClick={handleAddFlight}>Add Flight</button>
      </div>

      <ul className="flight-list">
        {flights.map((flight) => (
          <li key={flight.id} className="flight-item">
            <div className="flight-info">
              <strong>{flight.flightNumber}</strong> | {flight.departureCity} ➡ {flight.arrivalCity}<br />
              Departs: {flight.departureTime} | Arrives: {flight.arrivalTime}
            </div>
            <div className="flight-actions">
              <button className="flight-delete-button" onClick={() => handleDelete(flight.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flight;
