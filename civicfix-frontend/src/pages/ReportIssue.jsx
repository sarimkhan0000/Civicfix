import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ReportIssue() {
  const navigate = useNavigate();
  const [position, setPosition] = useState([26.8467, 80.9462]);
  const [categories] = useState([
    { id: 1, name: 'Roads & Potholes (PWD)' },
    { id: 2, name: 'Street Lighting (Electrical)' },
    { id: 3, name: 'Solid Waste & Garbage (Nagar Nigam)' },
    { id: 4, name: 'Water Leakage & Sewage (Jal Sansthan)' },
  ]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: 1,
    priority: 'MEDIUM',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationPreset = (lat, lng, addr) => {
    setPosition([lat, lng]);
    setFormData(prev => ({ ...prev, address: addr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: 'CF-' + Math.floor(1000 + Math.random() * 9000),
      title: formData.title || 'Municipal Grievance Report',
      description: formData.description || 'Reported civic issue requiring urgent resolution.',
      address: formData.address || 'MG Marg, Hazratganj, Lucknow',
      department: categories.find(c => c.id === Number(formData.categoryId))?.name || 'Municipal Works',
      priority: formData.priority,
      status: 'PENDING',
      eta: 'Under Review (SLA: 24 hrs)',
      date: 'Just now',
      latitude: position[0],
      longitude: position[1],
    };

    try {
      const existing = JSON.parse(localStorage.getItem('civicfix_custom_issues') || '[]');
      localStorage.setItem('civicfix_custom_issues', JSON.stringify([payload, ...existing]));
    } catch (err) {
      console.error(err);
    }

    try {
      await axiosClient.post('/complaints', payload);
    } catch (err) {
      console.log('Running in local/guest fallback mode');
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          Report a Municipal Grievance
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
          Submit issue details with tagged GPS coordinates directly to municipal command.
        </p>
      </div>

      {success && (
        <div style={{ marginBottom: '20px', padding: '14px 18px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', borderRadius: '10px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
          <CheckCircle2 size={20} color="#059669" />
          <span>Grievance logged successfully! Redirecting to Dashboard...</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Broken Water Pipe / Deep Road Pothole"
              value={formData.title}
              onChange={handleChange}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                Department Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              >
                <option value="LOW">Low (Routine)</option>
                <option value="MEDIUM">Medium (Normal)</option>
                <option value="HIGH">High (Urgent)</option>
                <option value="EMERGENCY">Critical Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
              Street Address / Landmark
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="e.g. Near Hazratganj Metro Gate 3"
              value={formData.address}
              onChange={handleChange}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
              Issue Description & Hazard Details
            </label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Describe damage caused, duration, danger to commuters..."
              value={formData.description}
              onChange={handleChange}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ padding: '10px 14px', backgroundColor: '#f1f5f9', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>GPS Coordinates:</span>
            <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#0f172a', backgroundColor: '#ffffff', padding: '3px 8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
              {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </span>
          </div>

          {/* REDESIGNED BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-slate"
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} strokeWidth={2} />
            )}
            <span>{loading ? 'Submitting Grievance...' : 'Submit Grievance to Municipal Authority'}</span>
          </button>
        </form>

        {/* MAP & LOCATION SELECTOR */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '520px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
            <MapPin size={18} color="#ef4444" />
            <span>Interactive Municipal GPS Radar</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <button
              type="button"
              onClick={() => handleLocationPreset(26.8467, 80.9462, 'MG Marg, Hazratganj, Lucknow')}
              style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              📍 Hazratganj Central
            </button>
            <button
              type="button"
              onClick={() => handleLocationPreset(26.8522, 80.9930, 'Vipin Khand, Lohia Park, Gomti Nagar')}
              style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              📍 Gomti Nagar
            </button>
            <button
              type="button"
              onClick={() => handleLocationPreset(26.8150, 80.9020, 'Chander Nagar, Alambagh, Lucknow')}
              style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              📍 Alambagh
            </button>
          </div>

          <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
            <iframe
              title="City Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${position[1]-0.02}%2C${position[0]-0.02}%2C${position[1]+0.02}%2C${position[0]+0.02}&layer=mapnik&marker=${position[0]}%2C${position[1]}`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}