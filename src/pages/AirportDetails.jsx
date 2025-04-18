import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function AirportDetails() {
  const { id } = useParams();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/airports/${id}`);
        setAirport(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching airport details. Please try again later.');
        setLoading(false);
        console.error('Error fetching airport details:', err);
      }
    };

    fetchAirport();
  }, [id]);

  if (loading) return <div className="loading">Loading airport details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!airport) return <div className="not-found">Airport not found</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Airport Details</h1>
        <Link to="/airports" className="back-button">Back to Airports</Link>
      </div>

      <div className="detail-card">
        <h2>{airport.name} ({airport.code})</h2>
        
        <div className="detail-section">
          <h3>Basic Information</h3>
          <div className="detail-item">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{airport.airportId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{airport.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Code:</span>
            <span className="detail-value">{airport.code}</span>
          </div>
        </div>

        <div className="detail-section">
          <h3>Location</h3>
          <div className="detail-item">
            <span className="detail-label">City:</span>
            <span className="detail-value">{airport.cityName?.cityName || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Country:</span>
            <span className="detail-value">{airport.cityName?.country || 'N/A'}</span>
          </div>
        </div>

        {airport.aircrafts && airport.aircrafts.length > 0 && (
          <div className="detail-section">
            <h3>Aircraft at this Airport</h3>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model</th>
                  <th>Airline</th>
                  <th>Passenger Capacity</th>
                </tr>
              </thead>
              <tbody>
                {airport.aircrafts.map(aircraft => (
                  <tr key={aircraft.aircraftId}>
                    <td>{aircraft.aircraftId}</td>
                    <td>{aircraft.model || aircraft.type}</td>
                    <td>{aircraft.airlineName}</td>
                    <td>{aircraft.numberOfPassengers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AirportDetails;