import React from 'react';
import './Header.css';

const Header = ({ currentTab, setCurrentTab, user }) => {
  const tabs = [];
  
  // Role-based tab visibility
  if (user.role === 'ADMIN' || user.role === 'MANAGER') {
    tabs.push('Projects', 'Tickets', 'Organization');
  } else if (user.role === 'DESIGNER') {
    tabs.push('Tickets');
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">Adobe Design Hub</div>
        <div className="header-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`header-tab ${currentTab === tab ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="header-user">
          <div className="user-avatar">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name">{user.displayName}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;