import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gate = () => {
  const [gates, setGates] = useState([]);
  const [formData, setFormData] = useState({ gateNumber: '', terminal: '' });

  useEffect(() => {
    fetchGates();
  }, []);

  const fetchGates = async () => {
    try {
      const res = await axios.get('http://localhost:8080/gates');
      setGates(res.data);
    } catch (err) {
      console.error('Error fetching gates:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddGate = async () => {
    try {
      await axios.post('http://localhost:8080/gates', formData);
      setFormData({ gateNumber: '', terminal: '' });
      fetchGates();
    } catch (err) {
      console.error('Error adding gate:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/gates/${id}`);
      fetchGates();
    } catch (err) {
      console.error('Error deleting gate:', err);
    }
  };

  return (
    <div className="gate-page-container">
      <div className="gate-page-header">
        <h1 className="gate-title">Gate Management</h1>
      </div>

      <div className="gate-form">
        <input
          type="text"
          name="gateNumber"
          placeholder="Gate Number"
          value={formData.gateNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="terminal"
          placeholder="Terminal"
          value={formData.terminal}
          onChange={handleInputChange}
        />
        <button onClick={handleAddGate}>Add Gate</button>
      </div>

      <ul className="gate-list">
        {gates.map((gate) => (
          <li key={gate.id} className="gate-item">
            <div className="gate-info">
              <strong>Gate:</strong> {gate.gateNumber} | <strong>Terminal:</strong> {gate.terminal}
            </div>
            <div className="gate-actions">
              <button className="gate-delete-button" onClick={() => handleDelete(gate.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gate;
