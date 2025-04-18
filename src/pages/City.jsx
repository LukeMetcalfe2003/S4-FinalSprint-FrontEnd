import React, { useEffect, useState } from 'react';
import axios from 'axios';

const City = () => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({ name: '', province: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/cities/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8080/cities', formData);
      }
      setFormData({ name: '', province: '' });
      fetchCities();
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const handleEdit = (city) => {
    setFormData({ name: city.name, province: city.province });
    setEditingId(city.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cities/${id}`);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  return (
    <div className="city-page-container">
      <div className="city-page-header">
        <h1 className="city-title">City Management</h1>
      </div>

      <div className="city-form">
        <input
          type="text"
          name="name"
          placeholder="City Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? 'Update City' : 'Add City'}
        </button>
      </div>

      <ul className="city-list">
        {cities.map((city) => (
          <li key={city.id} className="city-item">
            <div className="city-info">
              <span>
                <strong>{city.name}</strong> — {city.province}
              </span>
            </div>
            <div className="city-actions">
              <button className="city-edit-button" onClick={() => handleEdit(city)}>
                Edit
              </button>
              <button className="city-delete-button" onClick={() => handleDelete(city.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default City;



