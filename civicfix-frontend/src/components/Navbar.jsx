import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Helper to maintain consistent active/inactive text styling matching Dashboard
  const getNavLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? '#0f172a' : '#475569',
      fontSize: '14px',
      fontWeight: isActive ? '600' : '500',
      textDecoration: 'none',
      padding: '6px 10px',
      borderRadius: '6px',
      transition: 'color 0.15s ease'
    };
  };

  return (
    <nav style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
            CivicFix
          </span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb' }}></span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
              <Link
                to="/dashboard"
                style={getNavLinkStyle('/dashboard')}
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                style={getNavLinkStyle('/report')}
              >
                File Grievance
              </Link>
              <div style={{ width: '1px', height: '20px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />
              <span style={{ fontSize: '13px', color: '#64748b' }}>{user.firstName || 'Citizen'}</span>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '4px 6px'
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: '#334155', fontSize: '14px', fontWeight: '500', textDecoration: 'none', padding: '6px 12px' }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px'
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}