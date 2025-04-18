import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Aircraft = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [formData, setFormData] = useState({ name: '', model: '', capacity: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const fetchAircrafts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/aircrafts');
      setAircrafts(response.data);
    } catch (error) {
      console.error('Error fetching aircrafts:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/aircrafts/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8080/aircrafts', formData);
      }
      setFormData({ name: '', model: '', capacity: '' });
      fetchAircrafts();
    } catch (error) {
      console.error('Error saving aircraft:', error);
    }
  };

  const handleEdit = (aircraft) => {
    setFormData({ name: aircraft.name, model: aircraft.model, capacity: aircraft.capacity });
    setEditingId(aircraft.id);
  };

  return (
    <div className="aircraft-page-container">
      <div className="aircraft-page-header">
        <h1 className="aircraft-title">Aircraft Management</h1>
      </div>

      <div className="aircraft-form">
        <input
          type="text"
          name="name"
          placeholder="Aircraft Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? 'Update Aircraft' : 'Add Aircraft'}
        </button>
      </div>

      <ul className="aircraft-list">
        {aircrafts.map((aircraft) => (
          <li key={aircraft.id} className="aircraft-item">
            <div className="aircraft-info">
              <span>
                <strong>{aircraft.name}</strong> — {aircraft.model} — Capacity: {aircraft.capacity}
              </span>
            </div>
            <div className="aircraft-actions">
              <button className="aircraft-edit-button" onClick={() => handleEdit(aircraft)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aircraft;
