import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const goToCountries = () => {
    navigate('/country-list');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card" onClick={goToCountries} style={{ cursor: 'pointer' }}>
        <h2>Get All Countries</h2>
      </div>
    </div>
  );
};

export default Dashboard;
