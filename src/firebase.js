import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase configuration
// Get your config from: https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "AIzaSyAXt2iGB52MXMH7dq_7MvjxwS_RVf1Ay5A",
  authDomain: "e-waste-management-76052.firebaseapp.com",
  projectId: "e-waste-management-76052",
  storageBucket: "e-waste-management-76052.firebasestorage.app",
  messagingSenderId: "360028190945",
  appId: "1:360028190945:web:18160d807123f99c1e1fa0",
  measurementId: "G-HL85M175K2"
};

// Check if Firebase is configured
if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.error('⚠️ Firebase is not configured! Please update src/firebase.js with your Firebase credentials.');
    console.error('Get your config from: https://console.firebase.google.com/');
}

// Initialize Firebase
let app;
let auth;
let db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.error('Firebase initialization error:', error);
}

export { auth, db };
