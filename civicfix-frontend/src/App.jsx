import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Home() {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a', backgroundColor: '#fafafa' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 24px 60px 24px' }}>
        
        <div style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: '16px' }}>
            Municipal Grievance Routing System
          </p>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: '700', lineHeight: '1.15', letterSpacing: '-0.03em', color: '#0f172a', margin: '0 0 20px 0' }}>
            Structured civic issue reporting with verified departmental dispatch.
          </h1>

          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#475569', margin: '0 0 36px 0', maxWidth: '640px' }}>
            CivicFix connects urban residents directly to local division units — managing road repairs, lighting failures, sanitation clearance, and water network maintenance under transparent SLAs.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to={user ? "/report" : "/login"}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
            >
              Report an Issue
            </Link>

            <Link
              to={user ? "/dashboard" : "/login"}
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px',
                textDecoration: 'none',
                border: '1px solid #cbd5e1'
              }}
            >
              View Public Dashboard
            </Link>
          </div>
        </div>

      </section>

      {/* 2. OPERATIONAL METRICS */}
      <section style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '36px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>24 Hours</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Standard resolution SLA</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>4 Divisions</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>PWD, Jal Sansthan, Electrical, Sanitation</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>100% Geotagged</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>OpenStreetMap coordinate verification</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>Ward 24 Central</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Active operations coverage</div>
          </div>
        </div>
      </section>

      {/* 3. CORE ARCHITECTURE / HOW IT WORKS */}
      <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '72px 24px' }}>
        
        <div style={{ maxWidth: '520px', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0' }}>
            System Architecture
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
            Designed to replace manual paper complaints with automated ticket escalation and auditable resolution stages.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', marginBottom: '12px' }}>
              Step 01
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
              Citizen Incident Ingestion
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Citizens submit issue details along with GPS coordinates via map picker or device geolocation. The payload is validated and categorized under priority thresholds.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', marginBottom: '12px' }}>
              Step 02
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
              Departmental Routing & Queueing
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Complaints are queued directly into specific departmental pipelines (Jal Sansthan for pipelines, PWD for road repairs) with deterministic SLA target timestamps.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase', marginBottom: '12px' }}>
              Step 03
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
              Audit & Public Dashboard
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Field teams update status from Pending to In-Progress and Resolved. Citizens track progress on the public feed in real time.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748b' }}>
          <div>CivicFix • Municipal Engineering & Grievance Tracking</div>
          <div>Lucknow Division Operations</div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fafafa' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ReportIssue />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}