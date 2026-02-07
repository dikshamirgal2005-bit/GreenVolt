import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Auth.css';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [userType, setUserType] = useState('user');
    const [message, setMessage] = useState({ text: '', type: '' });

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // User registration state
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // Company registration state
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email is already registered.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            showMessage('Login successful!', 'success');
            console.log('User logged in:', userCredential.user.uid);
            // Dashboard will load automatically via App.js auth state
        } catch (error) {
            showMessage(getErrorMessage(error.code), 'error');
        }
    };

    const handleUserRegister = async (e) => {
        e.preventDefault();

        if (!auth) {
            showMessage('Firebase not initialized. Please check console.', 'error');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const userId = userCredential.user.uid;

            await setDoc(doc(db, 'users', userId), {
                username,
                mobile,
                email: userEmail,
                userType: 'user',
                createdAt: new Date().toISOString()
            });

            showMessage('User registered successfully!', 'success');
            setTimeout(() => {
                setUsername('');
                setMobile('');
                setUserEmail('');
                setUserPassword('');
                setActiveTab('login');
            }, 2000);
        } catch (error) {
            console.error('User registration error:', error);
            showMessage(getErrorMessage(error.code), 'error');
        }
    };

    const handleCompanyRegister = async (e) => {
        e.preventDefault();

        if (!auth) {
            showMessage('Firebase not initialized. Please check console.', 'error');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, companyEmail, companyPassword);
            const userId = userCredential.user.uid;

            await setDoc(doc(db, 'companies', userId), {
                companyName,
                phone: companyPhone,
                email: companyEmail,
                userType: 'company',
                createdAt: new Date().toISOString()
            });

            showMessage('Company registered successfully!', 'success');
            setTimeout(() => {
                setCompanyName('');
                setCompanyPhone('');
                setCompanyEmail('');
                setCompanyPassword('');
                setActiveTab('login');
            }, 2000);
        } catch (error) {
            console.error('Company registration error:', error);
            showMessage(getErrorMessage(error.code), 'error');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-box">
                    <div className="auth-header">
                        <div className="auth-logo">♻️</div>
                        <h1>E-Waste Management</h1>
                        <p>Recycle Smart, Save the Planet</p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </button>
                    </div>

                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {activeTab === 'login' ? (
                        <form onSubmit={handleLogin} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="login-email">📧 Email</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    placeholder="Enter your email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">🔒 Password</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    placeholder="Enter your password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">Login</button>
                        </form>
                    ) : (
                        <>
                            <div className="auth-tabs" style={{ marginTop: '20px' }}>
                                <button
                                    type="button"
                                    className={`auth-tab ${userType === 'user' ? 'active' : ''}`}
                                    onClick={() => setUserType('user')}
                                >
                                    👤 User
                                </button>
                                <button
                                    type="button"
                                    className={`auth-tab ${userType === 'company' ? 'active' : ''}`}
                                    onClick={() => setUserType('company')}
                                >
                                    🏢 Company
                                </button>
                            </div>

                            {userType === 'user' ? (
                                <form onSubmit={handleUserRegister} className="auth-form">
                                    <div className="form-group">
                                        <label htmlFor="user-username">👤 Username</label>
                                        <input
                                            type="text"
                                            id="user-username"
                                            placeholder="Enter your name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user-mobile">📱 Mobile Number</label>
                                        <input
                                            type="tel"
                                            id="user-mobile"
                                            pattern="[0-9]{10}"
                                            placeholder="10-digit mobile number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user-email">📧 Email</label>
                                        <input
                                            type="email"
                                            id="user-email"
                                            placeholder="Enter your email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user-password">🔒 Password</label>
                                        <input
                                            type="password"
                                            id="user-password"
                                            minLength="6"
                                            placeholder="At least 6 characters"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn">Register as User</button>
                                </form>
                            ) : (
                                <form onSubmit={handleCompanyRegister} className="auth-form">
                                    <div className="form-group">
                                        <label htmlFor="company-name">🏢 Company Name</label>
                                        <input
                                            type="text"
                                            id="company-name"
                                            placeholder="Enter company name"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company-phone">📱 Phone Number</label>
                                        <input
                                            type="tel"
                                            id="company-phone"
                                            pattern="[0-9]{10}"
                                            placeholder="10-digit phone number"
                                            value={companyPhone}
                                            onChange={(e) => setCompanyPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company-email">📧 Email</label>
                                        <input
                                            type="email"
                                            id="company-email"
                                            placeholder="Enter company email"
                                            value={companyEmail}
                                            onChange={(e) => setCompanyEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company-password">🔒 Password</label>
                                        <input
                                            type="password"
                                            id="company-password"
                                            minLength="6"
                                            placeholder="At least 6 characters"
                                            value={companyPassword}
                                            onChange={(e) => setCompanyPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submit-btn">Register as Company</button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
