import React, { useState } from 'react';
import './Tickets.css';

const Tickets = ({ user }) => {
  const [filter, setFilter] = useState('All');
  
  const mockTickets = [
    { 
      id: 1, 
      title: 'Design homepage hero section', 
      description: 'Create engaging hero design with brand colors', 
      status: 'Open', 
      assignee: 'Jane Doe',
      createdBy: 'Manager Name'
    },
    { 
      id: 2, 
      title: 'Update color palette', 
      description: 'Refresh brand colors based on new guidelines', 
      status: 'InProgress', 
      assignee: user.displayName,
      createdBy: 'Manager Name'
    },
    { 
      id: 3, 
      title: 'Create icon set', 
      description: '20 custom icons needed for dashboard', 
      status: 'Review', 
      assignee: 'John Smith',
      createdBy: 'Manager Name'
    },
    { 
      id: 4, 
      title: 'Mobile responsive fixes', 
      description: 'Fix layout issues on mobile devices', 
      status: 'Done', 
      assignee: user.displayName,
      createdBy: 'Manager Name'
    }
  ];

  const canCreateTicket = user.role === 'ADMIN' || user.role === 'MANAGER';

  const filteredTickets = filter === 'All' 
    ? mockTickets 
    : mockTickets.filter(ticket => ticket.status === filter);

  const handleCreateTicket = () => {
    // TODO: Open modal or navigate to create ticket page
    console.log('Create new ticket');
  };

  const handleTicketClick = (ticket) => {
    // TODO: Open ticket details modal
    console.log('Opening ticket:', ticket);
  };

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1>Tickets</h1>
        {canCreateTicket && (
          <button className="btn-primary" onClick={handleCreateTicket}>
            + New Ticket
          </button>
        )}
      </div>
      <div className="tickets-filters">
        {['All', 'Open', 'InProgress', 'Review', 'Done'].map(status => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="tickets-list">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets">No tickets found</div>
        ) : (
          filteredTickets.map(ticket => (
            <div 
              key={ticket.id} 
              className="ticket-card"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="ticket-main">
                <div className="ticket-title">{ticket.title}</div>
                <div className="ticket-description">{ticket.description}</div>
                <div className="ticket-footer">
                  <span>Assigned to: {ticket.assignee}</span>
                  <span>Updated 3h ago</span>
                </div>
              </div>
              <span className={`status-badge status-${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;