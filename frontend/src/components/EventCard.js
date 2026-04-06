import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/evento/${event.id}`)}
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        border: '1px solid #333'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={event.imagen} 
        alt={event.nombre} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '15px', textAlign: 'center', backgroundColor: 'var(--bordo-oscuro)' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{event.nombre}</h3>
      </div>
    </div>
  );
};

export default EventCard;