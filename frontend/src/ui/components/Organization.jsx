import React from 'react';
import './Organization.css';

const Organization = ({ organization, user }) => {
  const mockMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'MANAGER' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'DESIGNER' }
  ];

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="organization-container">
      <div className="organization-header">
        <h1>{organization.name}</h1>
        <p>Manage your organization settings and team members</p>
        {isAdmin && (
          <div className="invite-section">
            <strong>Invite Code:</strong>
            <div className="invite-code">{organization.inviteCode}</div>
            <p style={{fontSize: '13px', color: '#6e6e6e', marginTop: '8px'}}>
              Share this code with team members to join
            </p>
          </div>
        )}
      </div>
      <div className="members-section">
        <h2>Team Members ({mockMembers.length})</h2>
        <div className="members-list">
          {mockMembers.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-info">
                <div className="user-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="member-name">{member.name}</div>
                  <div className="member-email">{member.email}</div>
                </div>
              </div>
              <span className={`role-badge role-${member.role.toLowerCase()}`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organization;