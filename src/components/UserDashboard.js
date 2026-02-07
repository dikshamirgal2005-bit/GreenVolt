import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import AddEwaste from './AddEwaste';
import FindingCenters from './FindingCenters';
import History from './History';
import LearnMore from './LearnMore';
import './UserDashboard.css';

const UserDashboard = () => {
    const [activeSection, setActiveSection] = useState('welcome');
    const [companies, setCompanies] = useState([]);
    const [ecoPoints, setEcoPoints] = useState(0);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch companies
                const querySnapshot = await getDocs(collection(db, 'companies'));
                const companyData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCompanies(companyData);

                // Fetch user eco-points and profile
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setEcoPoints(userData.ecoPoints || 0);
                        setUserProfile(userData);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activeSection]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const user = auth.currentUser;
    const username = user?.email?.split('@')[0] || 'User';
    const displayName = userProfile?.username || user?.displayName || username;
    const userEmail = userProfile?.email || user?.email;
    const userMobile = userProfile?.mobile || 'Not provided';

    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <h1 onClick={() => setActiveSection('welcome')} style={{ cursor: 'pointer' }}>
                        ♻️ E-Waste Management
                    </h1>
                </div>
                <div className="nav-right">
                    <div className="eco-points">
                        <span className="points-icon">🌿</span>
                        <span className="points-text">Eco Points: {ecoPoints}</span>
                    </div>
                    <div className="user-avatar">
                        <span className="avatar-circle">{username.charAt(0).toUpperCase()}</span>
                        <span className="username">{username}</span>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="dashboard-content">
                {activeSection !== 'welcome' && (
                    <button className="back-btn" onClick={() => setActiveSection('welcome')}>
                        ← Back to Dashboard
                    </button>
                )}

                {activeSection === 'welcome' ? (
                    <div className="welcome-section-container">
                        <div className="welcome-section">
                            <h2>Welcome, {displayName}! 👋</h2>
                            <p>Manage your e-waste responsibly and earn eco points!</p>
                        </div>

                        {/* Profile Banner Section */}
                        <div className="profile-banner">
                            <div className="profile-header-large">
                                <div className="profile-avatar-large">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div className="profile-info-large">
                                    <h3>My Profile</h3>
                                    <div className="profile-grid">
                                        <div className="profile-item">
                                            <span className="label">Name:</span>
                                            <span className="value">{displayName}</span>
                                        </div>
                                        <div className="profile-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{userEmail}</span>
                                        </div>
                                        <div className="profile-item">
                                            <span className="label">Mobile:</span>
                                            <span className="value">{userMobile}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="feature-boxes">
                            <div className="feature-box" onClick={() => setActiveSection('add-ewaste')}>
                                <div className="feature-icon">📱</div>
                                <h3>Add E-Waste Product</h3>
                                <p>Upload your e-waste items</p>
                            </div>

                            <div className="feature-box" onClick={() => setActiveSection('finding-centers')}>
                                <div className="feature-icon">📍</div>
                                <h3>Finding Centers</h3>
                                <p>Locate nearby collection centers</p>
                            </div>

                            <div className="feature-box" onClick={() => setActiveSection('history')}>
                                <div className="feature-icon">📋</div>
                                <h3>History</h3>
                                <p>View your submission history</p>
                            </div>

                            <div className="feature-box" onClick={() => setActiveSection('learn-more')}>
                                <div className="feature-icon">📚</div>
                                <h3>Guidelines</h3>
                                <p>E-waste guidelines & tips</p>
                            </div>
                        </div>
                    </div>
                ) : activeSection === 'add-ewaste' ? (
                    <AddEwaste companies={companies} onSuccess={() => setActiveSection('history')} />
                ) : activeSection === 'finding-centers' ? (
                    <FindingCenters />
                ) : activeSection === 'history' ? (
                    <History />
                ) : activeSection === 'learn-more' ? (
                    <LearnMore />
                ) : null}
            </div>
        </div>
    );
};

export default UserDashboard;
