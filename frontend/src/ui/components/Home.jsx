import React from 'react';
import './Home.css';

const Home = ({ user, organization }) => {
  return (
    <div className="home-container">
      <div className="home-welcome">
        <h1>Welcome back, {user.displayName}!</h1>
        <p>{organization.name}</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Open Tickets</div>
          <div className="stat-value">34</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Review</div>
          <div className="stat-value">8</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Team Members</div>
          <div className="stat-value">15</div>
        </div>
      </div>
    </div>
  );
};

export default Home;