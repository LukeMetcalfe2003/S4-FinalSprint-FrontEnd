import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Passenger = () => {
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/passengers');
      setPassengers(res.data);
    } catch (err) {
      console.error('Failed to fetch passengers', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/passengers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8080/passengers', formData);
      }
      setFormData({ name: '', email: '', phoneNumber: '' });
      fetchPassengers();
    } catch (err) {
      console.error('Failed to save passenger', err);
    }
  };

  const handleEdit = (passenger) => {
    setFormData({
      name: passenger.name,
      email: passenger.email,
      phoneNumber: passenger.phoneNumber,
    });
    setEditingId(passenger.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/passengers/${id}`);
      fetchPassengers();
    } catch (err) {
      console.error('Failed to delete passenger', err);
    }
  };

  return (
    <div className="passenger-page-container">
      <div className="passenger-page-header">
        <h1 className="passenger-title">Passenger Management</h1>
      </div>

      <div className="passenger-form">
        <input
          type="text"
          name="name"
          placeholder="Passenger Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? 'Update Passenger' : 'Add Passenger'}
        </button>
      </div>

      <ul className="passenger-list">
        {passengers.map((passenger) => (
          <li key={passenger.id} className="passenger-item">
            <div className="passenger-info">
              <span>
                <strong>{passenger.name}</strong> — {passenger.email} — {passenger.phoneNumber}
              </span>
            </div>
            <div className="passenger-actions">
              <button className="passenger-edit-button" onClick={() => handleEdit(passenger)}>
                Edit
              </button>
              <button className="passenger-delete-button" onClick={() => handleDelete(passenger.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Passenger;

