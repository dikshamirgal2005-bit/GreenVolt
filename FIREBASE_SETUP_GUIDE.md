# 🔥 Firebase Setup Guide

## Current Status
Your React app is running but Firebase is **NOT CONFIGURED YET**. Follow these steps to set it up.

## Step-by-Step Setup

### 1. Create Firebase Project (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `e-waste-management` (or any name you prefer)
4. Click Continue
5. Disable Google Analytics (optional)
6. Click **"Create project"**
7. Wait for project creation to complete
8. Click **"Continue"**

### 2. Enable Email/Password Authentication (2 minutes)

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"** under Sign-in method
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### 3. Create Firestore Database (2 minutes)

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose your region (e.g., us-central1)
5. Click **"Enable"**

### 4. Get Firebase Configuration (3 minutes)

1. Click the **gear icon** ⚙️ next to "Project Overview" in the left sidebar
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** `</>`
5. Enter app nickname: `e-waste-web` (or any name)
6. Click **"Register app"**
7. You'll see a `firebaseConfig` object - **COPY THIS**

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

8. Click **"Continue to console"**

### 5. Update Your React App (1 minute)

1. Open the file: `src/firebase.js`
2. Replace the placeholder values with YOUR actual Firebase config:

**BEFORE:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**AFTER** (with your actual values):
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

3. **Save the file** - The React app will automatically reload!

### 6. Test Your App ✅

1. Go to [http://localhost:3001](http://localhost:3001)
2. Click **"Register"**
3. Click **"Register as User"**
4. Fill in the form and submit
5. You should see: **"User registered successfully!"**
6. Check Firebase Console → Authentication → Users to see your new user!

## Troubleshooting

### Error: "Firebase not configured"
- Make sure you updated `src/firebase.js` with your actual Firebase config
- Save the file and wait for the app to reload

### Error: "auth/invalid-api-key"
- Your API key is incorrect
- Go back to Firebase Console → Project Settings and copy the correct config

### Error: "Missing or insufficient permissions"
- Your Firestore is not in test mode
- Go to Firestore Database → Rules tab
- Replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 3, 1);
    }
  }
}
```
- Click **"Publish"**

### App not loading
- Check the browser console (F12) for errors
- Make sure the React dev server is running on port 3001

## Security Note ⚠️

The current Firestore rules allow anyone to read/write. This is OK for development but **NOT for production**.

For production, update your rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /companies/{companyId} {
      allow read, write: if request.auth != null && request.auth.uid == companyId;
    }
  }
}
```

## Next Steps

After Firebase is working:
1. ✅ Test user registration
2. ✅ Test company registration
3. ✅ Test login for both types
4. Create dashboard pages
5. Add e-waste management features

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
