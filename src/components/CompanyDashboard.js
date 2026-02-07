import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Uncomment when storage is ready
import ViewRequests from './ViewRequests';
import Analytics from './Analytics';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
    const [activeSection, setActiveSection] = useState('welcome');
    const [companyData, setCompanyData] = useState(null);
    const [stats, setStats] = useState({ total: 0, weight: 0, rating: 4.8 });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        companyName: '',
        email: '',
        phone: '',
        certificate: ''
    });
    const [certificateFile, setCertificateFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchCompanyData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'companies', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCompanyData(data);
                    setEditForm({
                        companyName: data.companyName || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        certificate: data.certificate || ''
                    });
                }

                // Fetch stats
                const q = query(
                    collection(db, 'ewasteRequests'),
                    where('companyId', '==', user.uid)
                );
                const querySnapshot = await getDocs(q);
                const requests = querySnapshot.docs.map(doc => doc.data());

                setStats({
                    total: requests.length,
                    weight: requests.reduce((sum, r) => sum + parseFloat(r.weight || 0), 0),
                    rating: 4.8
                });
            }
        };
        fetchCompanyData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setCertificateFile(e.target.files[0]);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const user = auth.currentUser;
            // let certificateUrl = editForm.certificate;

            if (certificateFile) {
                // In a real app, upload to Firebase Storage
                // const storage = getStorage();
                // const storageRef = ref(storage, `certificates/${user.uid}/${certificateFile.name}`);
                // await uploadBytes(storageRef, certificateFile);
                // certificateUrl = await getDownloadURL(storageRef);
            }

            const docRef = doc(db, 'companies', user.uid);
            await updateDoc(docRef, {
                companyName: editForm.companyName,
                phone: editForm.phone,
                // certificate: certificateUrl 
            });

            setCompanyData(prev => ({
                ...prev,
                companyName: editForm.companyName,
                phone: editForm.phone
            }));
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } finally {
            setUploading(false);
        }
    };

    const user = auth.currentUser;
    const displayName = companyData?.companyName || user?.email?.split('@')[0] || 'Company';
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <div className="dashboard company-dashboard">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <h1 onClick={() => setActiveSection('welcome')} style={{ cursor: 'pointer' }}>
                        🏭 E-Waste Partner
                    </h1>
                </div>
                <div className="nav-right">
                    <div className="company-avatar">
                        <span className="avatar-circle">
                            {initials}
                        </span>
                        <span className="company-name">{displayName}</span>
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
                    <div className="welcome-section company-welcome">
                        <h2>Welcome back, {displayName}! 👋</h2>
                        <p>Manage your e-waste collections and track your impact.</p>

                        <div className="stats-section">
                            <div className="stat-card">
                                <h3>Total Requests</h3>
                                <p className="stat-value">{stats.total}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Recycled (kg)</h3>
                                <p className="stat-value">{stats.weight.toFixed(2)}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Rating</h3>
                                <p className="stat-value">{stats.rating}</p>
                            </div>
                        </div>

                        <div className="feature-cards">
                            <div className="feature-card" onClick={() => setActiveSection('view-requests')}>
                                <div className="feature-icon">📋</div>
                                <h3>View Requests</h3>
                                <p>Check pending e-waste collection requests from users</p>
                            </div>

                            <div className="feature-card" onClick={() => setActiveSection('analytics')}>
                                <div className="feature-icon">📈</div>
                                <h3>Analytics</h3>
                                <p>View collection trends and environmental impact</p>
                            </div>

                            <div className="feature-card" onClick={() => setActiveSection('company-details')}>
                                <div className="feature-icon">🏢</div>
                                <h3>Company Profile</h3>
                                <p>Manage your profile and certificates</p>
                            </div>
                        </div>
                    </div>
                ) : activeSection === 'view-requests' ? (
                    <ViewRequests />
                ) : activeSection === 'analytics' ? (
                    <Analytics />
                ) : activeSection === 'company-details' ? (
                    <div className="company-details-section">
                        {!isEditing ? (
                            <>
                                <div className="profile-header">
                                    <h3>Company Profile</h3>
                                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                        ✏️ Edit Profile
                                    </button>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Company Name:</span>
                                    <span className="detail-value">{companyData?.companyName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{companyData?.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Phone:</span>
                                    <span className="detail-value">{companyData?.phone || 'Not provided'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Recycling Certificate:</span>
                                    <span className="detail-value">
                                        {companyData?.certificate ? (
                                            <a href={companyData.certificate} target="_blank" rel="noopener noreferrer" className="certificate-link">
                                                📄 View Certificate
                                            </a>
                                        ) : (
                                            <span style={{ color: '#999', fontStyle: 'italic' }}>No certificate uploaded</span>
                                        )}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Joined:</span>
                                    <span className="detail-value">{companyData?.createdAt && new Date(companyData.createdAt).toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSaveProfile} className="edit-profile-form">
                                <div className="profile-header">
                                    <h3>Edit Profile</h3>
                                </div>

                                <div className="edit-form-grid">
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={editForm.companyName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Recycling Certificate (Upload)</label>
                                        <div className="file-upload-wrapper">
                                            <input
                                                type="file"
                                                id="certificate-upload"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <label htmlFor="certificate-upload" style={{ cursor: 'pointer', display: 'block' }}>
                                                {certificateFile ? (
                                                    <span>📄 {certificateFile.name}</span>
                                                ) : (
                                                    <span>📤 Click to upload certificate</span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="save-btn" disabled={uploading}>
                                        {uploading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CompanyDashboard;
