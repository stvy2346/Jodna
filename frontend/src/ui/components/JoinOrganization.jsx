import React, { useState } from 'react';
import { Building2, Plus, LogOut, Users, Sparkles } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

const JoinOrganization = ({ onOrgJoined, user, onLogout }) => {
  const [mode, setMode] = useState('join');
  const [inviteCode, setInviteCode] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getToken = () => localStorage.getItem('token');
  const authConfig = () => {
    const token = getToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      setError('Invite code is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/api/organizations/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authConfig().headers
        },
        body: JSON.stringify({ inviteCode: inviteCode.trim() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to join');
      onOrgJoined(data);
    } catch (err) {
      console.error('Error joining organization:', err);
      setError(err.message || 'Failed to join organization. Invalid code?');
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!orgName.trim()) {
      setError('Organization name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/api/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authConfig().headers
        },
        body: JSON.stringify({ name: orgName })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create');
      onOrgJoined(data);
    } catch (err) {
      console.error('Error creating organization:', err);
      setError(err.message || 'Failed to create organization');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === 'join' ? handleJoin() : handleCreate();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 overflow-y-auto">
      <div className="w-full max-w-[320px] mx-auto p-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-3 shadow-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to Jodna</h1>
          <p className="text-xs text-gray-600 px-2">
            {mode === 'join' 
              ? 'Join your team with an invite code' 
              : 'Create a new workspace for your team'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-50 p-0.5 m-3 rounded-lg gap-0.5">
            <button
              onClick={() => { setMode('join'); setError(''); }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-md font-medium transition-all duration-200 text-sm ${
                mode === 'join'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={16} />
              Join
            </button>
            <button
              onClick={() => { setMode('create'); setError(''); }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-md font-medium transition-all duration-200 text-sm ${
                mode === 'create'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus size={16} />
              Create
            </button>
          </div>

          <div className="p-4 space-y-4">
            {mode === 'join' ? (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Invite Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => { setInviteCode(e.target.value); setError(''); }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    placeholder="Enter invite code"
                    disabled={loading}
                    autoFocus
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Organization Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => { setOrgName(e.target.value); setError(''); }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    placeholder="e.g., Acme Corp"
                    disabled={loading}
                    autoFocus
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-600 text-xs font-bold">!</span>
                </div>
                <p className="text-xs text-red-700 flex-1">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'join' ? 'Joining...' : 'Creating...'}
                </>
              ) : (
                <>
                  {mode === 'join' ? <Users size={16} /> : <Building2 size={16} />}
                  {mode === 'join' ? 'Join Organization' : 'Create Organization'}
                </>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-lg transition-all duration-200"
        >
          <LogOut size={14} />
          <span className="font-medium">Sign Out</span>
        </button>

        {user && (
          <p className="text-center mt-3 text-xs text-gray-500">
            Signed in as <span className="font-medium text-gray-700">{user.email || user.username}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinOrganization;