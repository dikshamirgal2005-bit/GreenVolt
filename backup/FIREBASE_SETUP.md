# Firebase Setup Instructions

## Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "e-waste-management")
4. Follow the setup wizard

## Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" sign-in method

## Step 3: Create Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your region

## Step 4: Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app
5. Copy the Firebase configuration object

## Step 5: Update auth.js
Open `auth.js` and replace the firebaseConfig object with your actual configuration:

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

## Step 6: Firestore Security Rules (Optional for Production)
In Firestore, set up security rules:

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

## Step 7: Run Your App
Open `auth.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to http://localhost:8000/auth.html

## Data Structure

### Users Collection
- Document ID: Firebase Auth UID
- Fields:
  - username (string)
  - mobile (string)
  - email (string)
  - userType: "user"
  - createdAt (timestamp)

### Companies Collection
- Document ID: Firebase Auth UID
- Fields:
  - companyName (string)
  - phone (string)
  - email (string)
  - userType: "company"
  - createdAt (timestamp)
