// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    setDoc 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
     apiKey: "AIzaSyAXt2iGB52MXMH7dq_7MvjxwS_RVf1Ay5A",
  authDomain: "e-waste-management-76052.firebaseapp.com",
  projectId: "e-waste-management-76052",
  storageBucket: "e-waste-management-76052.firebasestorage.app",
  messagingSenderId: "360028190945",
  appId: "1:360028190945:web:18160d807123f99c1e1fa0",
  measurementId: "G-HL85M175K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Tab switching
window.showTab = function(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabBtns[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabBtns[1].classList.add('active');
    }
    
    clearMessage();
};

// User type selection
window.selectUserType = function(type) {
    const userForm = document.getElementById('user-register-form');
    const companyForm = document.getElementById('company-register-form');
    const typeBtns = document.querySelectorAll('.type-btn');
    
    typeBtns.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'user') {
        userForm.classList.add('active');
        companyForm.classList.remove('active');
        typeBtns[0].classList.add('active');
    } else {
        userForm.classList.remove('active');
        companyForm.classList.add('active');
        typeBtns[1].classList.add('active');
    }
    
    clearMessage();
};

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
}

function clearMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Handle Login
window.handleLogin = async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage('Login successful!', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            // TODO: Redirect based on user type
            console.log('User logged in:', userCredential.user.uid);
            // window.location.href = 'dashboard.html';
        }, 1000);
    } catch (error) {
        showMessage(getErrorMessage(error.code), 'error');
    }
};

// Handle User Registration
window.handleUserRegister = async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('user-username').value;
    const mobile = document.getElementById('user-mobile').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    
    try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        
        // Save user data to Firestore
        await setDoc(doc(db, 'users', userId), {
            username: username,
            mobile: mobile,
            email: email,
            userType: 'user',
            createdAt: new Date().toISOString()
        });
        
        showMessage('User registered successfully!', 'success');
        
        // Clear form and switch to login after 2 seconds
        setTimeout(() => {
            event.target.reset();
            showTab('login');
        }, 2000);
    } catch (error) {
        showMessage(getErrorMessage(error.code), 'error');
    }
};

// Handle Company Registration
window.handleCompanyRegister = async function(event) {
    event.preventDefault();
    
    const companyName = document.getElementById('company-name').value;
    const phone = document.getElementById('company-phone').value;
    const email = document.getElementById('company-email').value;
    const password = document.getElementById('company-password').value;
    
    try {
        // Create company account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        
        // Save company data to Firestore
        await setDoc(doc(db, 'companies', userId), {
            companyName: companyName,
            phone: phone,
            email: email,
            userType: 'company',
            createdAt: new Date().toISOString()
        });
        
        showMessage('Company registered successfully!', 'success');
        
        // Clear form and switch to login after 2 seconds
        setTimeout(() => {
            event.target.reset();
            showTab('login');
        }, 2000);
    } catch (error) {
        showMessage(getErrorMessage(error.code), 'error');
    }
};

// Error message helper
function getErrorMessage(errorCode) {
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
}
