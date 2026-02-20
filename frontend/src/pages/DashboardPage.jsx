import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchStats, fetchAppointments } from '../services/api';

const DashboardPage = ({ user, setUser }) => {
    const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0, cancelled: 0 });
    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [statsRes, appointmentsRes] = await Promise.all([
                    fetchStats(),
                    fetchAppointments()
                ]);
                setStats(statsRes.data);
                setRecentAppointments(appointmentsRes.data.slice(0, 5));
            } catch (err) {
                console.error("Failed to load dashboard data");
            }
        };
        loadDashboardData();
    }, []);

    return (
        <div className="dashboard-page">
            <Navbar user={user} setUser={setUser} />
            <div className="container">
                <header className="dashboard-header">
                    <h1>Welcome, {user.user.name}</h1>
                    <p>MediCore Pro • {user.user.role.toUpperCase()}</p>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Appointments</h3>
                        <p className="stat-value">{stats.total}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Upcoming</h3>
                        <p className="stat-value text-primary">{stats.upcoming}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Completed</h3>
                        <p className="stat-value text-success">{stats.completed}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Cancelled/Rejected</h3>
                        <p className="stat-value text-error">{stats.cancelled}</p>
                    </div>
                </div>

                {user.user.role === 'doctor' && stats.upcoming > 0 && (
                    <div className="card" style={{ marginBottom: '2.5rem', borderLeft: '5px solid var(--pending)', background: '#fffbeb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                            <div>
                                <h3 style={{ margin: 0, color: '#92400e' }}>Action Required</h3>
                                <p style={{ margin: 0, color: '#b45309', fontSize: '0.9rem' }}>
                                    You have <strong>{stats.upcoming}</strong> active appointments. Please visit <strong>My Schedule</strong> to approve pending requests or start consultations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="dashboard-content-grid">
                    <section className="quick-actions card">
                        <h2>Quick Actions</h2>
                        <div className="actions-list">
                            {user.user.role === 'patient' && (
                                <Link to="/book" className="action-btn">
                                    <span className="icon">📅</span>
                                    <div>
                                        <strong>Book New Appointment</strong>
                                        <p>Schedule a visit with a specialist</p>
                                    </div>
                                </Link>
                            )}
                            <Link to="/schedule" className="action-btn">
                                <span className="icon">🕒</span>
                                <div>
                                    <strong>{user.user.role === 'doctor' ? 'Manage Schedule' : 'View My Schedule'}</strong>
                                    <p>{user.user.role === 'doctor' ? 'See your daily appointments' : 'Check your upcoming and past visits'}</p>
                                </div>
                            </Link>
                        </div>
                    </section>

                    <section className="recent-activity card">
                        <h2>Recent Activity</h2>
                        {recentAppointments.length > 0 ? (
                            <div className="activity-list">
                                {recentAppointments.map(app => (
                                    <div key={app._id} className="activity-item">
                                        <div className="activity-info">
                                            <strong>{user.user.role === 'patient' ? app.doctorName : app.patientName}</strong>
                                            <span>{app.department} • {app.date}</span>
                                        </div>
                                        <span className={`badge bg-${app.status}`}>{app.status}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-state">No recent activity found.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
