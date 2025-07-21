import React from 'react';

const StatCard = ({ title, count }) => (
  <div style={cardStyle}>
    <h3 style={titleStyle}>{title}</h3>
    <p style={countStyle}>{count}</p>
  </div>
);

const cardStyle = {
  background: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '20px',
  textAlign: 'center',
     border: '1px solid #ddd',
  flex: '1',
  
  minWidth: '200px',
};

const titleStyle = {
  margin: 0,
  color: '#666',
  fontSize: '18px',
};

const countStyle = {
  margin: '10px 0 0',
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
};

export default StatCard;
