import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MapPin, AlertTriangle, Clock, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

const SEED_ACTIVE_ISSUES = [
  {
    id: 'CF-8401',
    title: 'Deep Pothole on Curve Near Metro Pillar 42',
    description: 'Hazardous 2-foot depression causing severe traffic slowdowns and bike skids during late night hours.',
    address: 'MG Marg, Near Hazratganj Metro Gate 3',
    department: 'PWD Roads Division',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    eta: 'Under Repair (ETA: 4 hrs)',
    date: 'Today, 02:40 PM'
  },
  {
    id: 'CF-8395',
    title: 'Main Drinking Water Pipeline Fracture & Gushing',
    description: 'Underground 4-inch transmission line split. Clean water flooding carriage-way, disrupting pressure in 60 households.',
    address: 'Vipin Khand, Near Lohia Park Gate 2, Gomti Nagar',
    department: 'Jal Sansthan Zone-4',
    priority: 'EMERGENCY',
    status: 'IN_PROGRESS',
    eta: 'Team Dispatched (ETA: 2 hrs)',
    date: 'Today, 10:15 AM'
  },
  {
    id: 'CF-8370',
    title: '5 High-Mast Streetlights Non-Functional',
    description: 'Blackout stretch along the secondary service lane adjacent to the neighborhood park.',
    address: 'Sector B, Chander Nagar, Alambagh',
    department: 'Municipal Electrical Wing',
    priority: 'MEDIUM',
    status: 'PENDING',
    eta: 'Scheduled Inspection',
    date: 'Yesterday'
  },
  {
    id: 'CF-8344',
    title: 'Commercial Solid Waste Overflow Blocking Footpath',
    description: 'Bulk municipal compactor skipped for 48 hours. Stray animal activity creating hygiene hazard.',
    address: 'Patrakarpuram Chauraha, Gomti Nagar',
    department: 'Nagar Nigam Sanitation',
    priority: 'HIGH',
    status: 'PENDING',
    eta: 'Assigned to Ward Inspector',
    date: 'Yesterday'
  }
];

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    try {
      const customIssues = JSON.parse(localStorage.getItem('civicfix_custom_issues') || '[]');
      setComplaints([...customIssues, ...SEED_ACTIVE_ISSUES]);
    } catch (e) {
      setComplaints(SEED_ACTIVE_ISSUES);
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RESOLVED':
        return (
          <span style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} /> RESOLVED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={13} /> IN ACTION
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> PENDING
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'EMERGENCY':
        return <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={13} /> CRITICAL</span>;
      case 'HIGH':
        return <span style={{ color: '#ea580c', fontSize: '12px', fontWeight: '700' }}>HIGH</span>;
      case 'MEDIUM':
        return <span style={{ color: '#d97706', fontSize: '12px', fontWeight: '600' }}>MEDIUM</span>;
      default:
        return <span style={{ color: '#64748b', fontSize: '12px' }}>LOW</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Live Grievance Operations
            </h1>
            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: '1px solid #bfdbfe' }}>
              WARD 24 - CENTRAL
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Real-time municipal complaints feed tracked with field response units.
          </p>
        </div>

        {/* REDESIGNED BUTTON */}
        <Link
          to="/report"
          className="btn-primary-slate"
        >
          <PlusCircle size={16} strokeWidth={2.2} />
          <span>File New Grievance</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Complaints</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>{complaints.length} Logged</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Field Crews Deployed</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>2 Teams</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Average Response SLA</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', marginTop: '4px' }}>3.8 Hours</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Resolution Rate</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>92.4%</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current Municipal Grievances Feed
          </span>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }}></span>
            Live Updates Active
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 20px' }}>Issue & Department</th>
                <th style={{ padding: '14px 20px' }}>Street Landmark</th>
                <th style={{ padding: '14px 20px' }}>Priority</th>
                <th style={{ padding: '14px 20px' }}>Current Status</th>
                <th style={{ padding: '14px 20px' }}>SLA / Dispatch ETA</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item, idx) => (
                <tr key={item.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', maxWidth: '380px', lineHeight: '1.4' }}>
                      {item.description}
                    </div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={13} /> {item.department || 'Municipal Authority'}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px' }}>
                      <MapPin size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item.address}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {getPriorityBadge(item.priority)}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '13px' }}>
                      {item.eta || 'Standard SLA (24h)'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      Reported: {item.date || 'Recent'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}