import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navStyle = {
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    };

    const containerStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    };

    const logoIconStyle = {
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0,
    };

    const subtitleStyle = {
        fontSize: '0.75rem',
        color: '#64748b',
        fontWeight: '500',
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '0.5rem',
    };

    const getLinkStyle = (active) => ({
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.875rem',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        background: active ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
        color: active ? '#ffffff' : '#64748b',
        boxShadow: active ? '0 2px 8px rgba(59, 130, 246, 0.3)' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    });

    const statusStyle = {
        padding: '0.5rem 1rem',
        background: '#d1fae5',
        color: '#10b981',
        fontSize: '0.75rem',
        fontWeight: '700',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                {/* Logo */}
                <div style={logoStyle}>
                    <div style={logoIconStyle}>
                        ⚡
                    </div>
                    <div>
                        <h1 style={titleStyle}>SaberWing Command</h1>
                        <p style={subtitleStyle}>Defense Aviation • Inventory Management</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={navLinksStyle}>
                    <Link
                        to="/"
                        style={getLinkStyle(isActive('/'))}
                        onMouseEnter={(e) => {
                            if (!isActive('/')) {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.color = '#0f172a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/')) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#64748b';
                            }
                        }}
                    >
                        <span>🌐</span>
                        <span>Supplier Network</span>
                    </Link>
                    <Link
                        to="/procurement"
                        style={getLinkStyle(isActive('/procurement'))}
                        onMouseEnter={(e) => {
                            if (!isActive('/procurement')) {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.color = '#0f172a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/procurement')) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#64748b';
                            }
                        }}
                    >
                        <span>📋</span>
                        <span>Procurement</span>
                    </Link>
                    <Link
                        to="/inventory"
                        style={getLinkStyle(isActive('/inventory'))}
                        onMouseEnter={(e) => {
                            if (!isActive('/inventory')) {
                                e.currentTarget.style.background = '#f8fafc';
                                e.currentTarget.style.color = '#0f172a';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive('/inventory')) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#64748b';
                            }
                        }}
                    >
                        <span>🤖</span>
                        <span>AI Inventory</span>
                    </Link>
                </div>

                {/* Status */}
                <div style={statusStyle}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#10b981',
                        borderRadius: '50%',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}></div>
                    <span>LIVE</span>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
