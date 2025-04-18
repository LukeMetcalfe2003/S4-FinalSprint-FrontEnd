import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AirportPage = () => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [newAirport, setNewAirport] = useState({ name: '', location: '' });
  const [idToFetch, setIdToFetch] = useState('');

  const API_BASE = 'http://localhost:8080/airports';

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAirports(res.data);
    } catch (err) {
      console.error('Error fetching airports:', err);
    }
  };

  const fetchAirportById = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${idToFetch}`);
      setSelectedAirport(res.data);
    } catch (err) {
      console.error('Error fetching airport by ID:', err);
      setSelectedAirport(null);
    }
  };

  const createAirport = async () => {
    try {
      await axios.post(API_BASE, newAirport);
      setNewAirport({ name: '', location: '' });
      fetchAirports();
    } catch (err) {
      console.error('Error creating airport:', err);
    }
  };

  const updateAirport = async (id) => {
    try {
      await axios.put(`${API_BASE}/${id}`, newAirport);
      setNewAirport({ name: '', location: '' });
      fetchAirports();
    } catch (err) {
      console.error('Error updating airport:', err);
    }
  };

  return (
    <div className="airport-container">
      <h1 className="airport-title">Airports</h1>

      <ul className="airport-list">
        {airports.map((airport) => (
          <li key={airport.id} className="airport-item">
            <strong>{airport.name}</strong> - {airport.location}
          </li>
        ))}
      </ul>

      <div className="airport-form-section">
        <h2 className="airport-title">Get Airport by ID</h2>
        <div className="airport-form">
          <input
            type="text"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            placeholder="Enter ID"
          />
          <button onClick={fetchAirportById}>Fetch</button>
        </div>
        {selectedAirport && (
          <div className="selected-airport">
            <p><strong>ID:</strong> {selectedAirport.id}</p>
            <p><strong>Name:</strong> {selectedAirport.name}</p>
            <p><strong>Location:</strong> {selectedAirport.location}</p>
          </div>
        )}
      </div>

      <div className="airport-form-section">
        <h2 className="airport-title">Create / Update Airport</h2>
        <div className="airport-form">
          <input
            type="text"
            value={newAirport.name}
            onChange={(e) => setNewAirport({ ...newAirport, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={newAirport.location}
            onChange={(e) => setNewAirport({ ...newAirport, location: e.target.value })}
            placeholder="Location"
          />
          <button onClick={createAirport}>Create</button>
          <button onClick={() => updateAirport(idToFetch)}>Update by ID</button>
        </div>
      </div>
    </div>
  );
};

export default AirportPage;
