import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Auth from './components/Auth';
import UserDashboard from './components/UserDashboard';
import CompanyDashboard from './components/CompanyDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Check if user is in 'users' collection
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserType('user');
        } else {
          // Check if user is in 'companies' collection
          const companyDoc = await getDoc(doc(db, 'companies', currentUser.uid));
          if (companyDoc.exists()) {
            setUserType('company');
          } else {
            // Default or error handling
            console.error('User type not found');
            setUserType(null);
          }
        }
      } else {
        setUserType(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div className="App">
      {!user ? (
        <Auth />
      ) : userType === 'company' ? (
        <CompanyDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}

export default App;
