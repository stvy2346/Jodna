import React, { useState } from 'react';
import './CreateOrganization.css';

const CreateOrganization = ({ onOrgCreated, user }) => {
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!orgName.trim()) return;
    
    setLoading(true);
    
    // TODO: Replace with actual API call
    // const response = await fetch('YOUR_BACKEND_URL/api/organizations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({ name: orgName, owner: user.id })
    // });
    // const newOrg = await response.json();
    
    // Simulate API call
    setTimeout(() => {
      const newOrg = {
        id: 'org_' + Date.now(),
        name: orgName,
        owner: user.id,
        inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: new Date()
      };
      onOrgCreated(newOrg);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="create-org-container">
      <div className="create-org-card">
        <h1 className="create-org-title">Create Your Organization</h1>
        <p className="create-org-subtitle">
          Get started by creating your organization workspace
        </p>
        <div className="create-org-form">
          <div className="form-group">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Acme Design Studio"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <button 
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading || !orgName.trim()}
          >
            {loading ? 'Creating...' : 'Create Organization'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrganization;