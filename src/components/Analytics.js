import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Analytics.css';

const Analytics = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        totalWeight: 0,
        totalPrize: 0
    });
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        loadAnalytics();
        // Trigger animation after mount
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const loadAnalytics = async () => {
        try {
            const user = auth.currentUser;
            const q = query(
                collection(db, 'ewasteRequests'),
                where('companyId', '==', user.uid)
            );

            const querySnapshot = await getDocs(q);
            const requests = querySnapshot.docs.map(doc => doc.data());

            const analytics = {
                total: requests.length,
                pending: requests.filter(r => r.status === 'pending').length,
                approved: requests.filter(r => r.status === 'approved').length,
                rejected: requests.filter(r => r.status === 'rejected').length,
                totalWeight: requests.reduce((sum, r) => sum + parseFloat(r.weight || 0), 0),
                totalPrize: requests.reduce((sum, r) => sum + parseFloat(r.prize || 0), 0)
            };

            setStats(analytics);
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading analytics...</div>;
    }

    const pieData = [
        { name: 'Pending', value: stats.pending, color: '#f39c12', gradient: ['#f1c40f', '#f39c12'] },
        { name: 'Approved', value: stats.approved, color: '#27ae60', gradient: ['#2ecc71', '#27ae60'] },
        { name: 'Rejected', value: stats.rejected, color: '#c0392b', gradient: ['#e74c3c', '#c0392b'] }
    ];

    const total = stats.pending + stats.approved + stats.rejected;
    let currentAngle = 0;

    // Calculate stroke dasharray for donut chart animation
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className={`analytics ${isVisible ? 'visible' : ''}`}>
            <h2>📊 Analytics Dashboard</h2>

            <div className="analytics-grid">
                {/* Key Metrics Cards */}
                <div className="metrics-summary">
                    <div className="summary-card">
                        <div className="icon">📦</div>
                        <div className="info">
                            <h4>Total Requests</h4>
                            <p className="value">{stats.total}</p>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="icon">⚖️</div>
                        <div className="info">
                            <h4>Total Weight</h4>
                            <p className="value">{stats.totalWeight.toFixed(2)} kg</p>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="icon">💰</div>
                        <div className="info">
                            <h4>Total Value</h4>
                            <p className="value">₹{stats.totalPrize}</p>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="icon">✅</div>
                        <div className="info">
                            <h4>Approval Rate</h4>
                            <p className="value">
                                {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="charts-container">
                    {/* Donut Chart */}
                    <div className="chart-card donut-card">
                        <h3>Distribution</h3>
                        <div className="donut-chart-container">
                            <svg viewBox="0 0 200 200" className="donut-chart">
                                {total > 0 ? pieData.map((item, index) => {
                                    const percentage = (item.value / total) * 100;
                                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                                    const rotateAngle = currentAngle;
                                    currentAngle += (percentage / 100) * 360;

                                    return (
                                        <circle
                                            key={index}
                                            r={radius}
                                            cx="100"
                                            cy="100"
                                            fill="transparent"
                                            stroke={item.gradient[1]} // Fallback
                                            strokeWidth="25"
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={isVisible ? 0 : circumference} // Animation
                                            transform={`rotate(${rotateAngle - 90} 100 100)`}
                                            className="donut-segment"
                                            style={{ transitionDelay: `${index * 0.2}s`, stroke: `url(#gradient-${index})` }}
                                        />
                                    );
                                }) : (
                                    <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e0e0e0" strokeWidth="25" />
                                )}
                                {/* Define Gradients */}
                                <defs>
                                    {pieData.map((item, index) => (
                                        <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor={item.gradient[0]} />
                                            <stop offset="100%" stopColor={item.gradient[1]} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                {/* Center Text */}
                                <text x="50%" y="50%" textAnchor="middle" dy="0.3em" className="donut-text">
                                    {stats.total} Total
                                </text>
                            </svg>
                            <div className="chart-legend">
                                {pieData.map((item, index) => (
                                    <div key={index} className="legend-item">
                                        <span className="legend-dot" style={{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }}></span>
                                        <span>{item.name}: <strong>{item.value}</strong> ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="chart-card bar-card">
                        <h3>Status Breakdown</h3>
                        <div className="bar-chart-visual">
                            {/* Pending Bar */}
                            <div className="visual-bar-group">
                                <div className="visual-bar-bg">
                                    <div
                                        className="visual-bar-fill pending"
                                        style={{ height: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="visual-bar-label">Pending</span>
                                <span className="visual-bar-value">{stats.pending}</span>
                            </div>

                            {/* Approved Bar */}
                            <div className="visual-bar-group">
                                <div className="visual-bar-bg">
                                    <div
                                        className="visual-bar-fill approved"
                                        style={{ height: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="visual-bar-label">Approved</span>
                                <span className="visual-bar-value">{stats.approved}</span>
                            </div>

                            {/* Rejected Bar */}
                            <div className="visual-bar-group">
                                <div className="visual-bar-bg">
                                    <div
                                        className="visual-bar-fill rejected"
                                        style={{ height: `${stats.total > 0 ? (stats.rejected / stats.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <span className="visual-bar-label">Rejected</span>
                                <span className="visual-bar-value">{stats.rejected}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
