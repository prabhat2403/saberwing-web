import React from 'react';

const GlassCard = ({ children, className = '', onClick }) => {
    const cardStyle = {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        borderRadius: '12px',
        padding: '1.5rem',
        color: '#1e293b',
        transition: 'all 0.2s ease',
    };

    return (
        <div
            style={cardStyle}
            className={`glass-card ${className}`}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {children}
        </div>
    );
};

export default GlassCard;
