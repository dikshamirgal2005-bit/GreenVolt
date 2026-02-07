# Firebase Setup Checklist ✅

Your Firebase config is already in the code! Now just verify these settings:

## 1. Enable Authentication

1. Go to: https://console.firebase.google.com/project/e-waste-management-76052/authentication
2. Click **"Get started"** (if you see it)
3. Click **"Email/Password"** under Sign-in method
4. Toggle **"Enable"** to ON
5. Click **"Save"**

## 2. Create Firestore Database

1. Go to: https://console.firebase.google.com/project/e-waste-management-76052/firestore
2. Click **"Create database"**
3. Select **"Start in test mode"**
4. Choose your region
5. Click **"Enable"**

## 3. Test Your App

Go to: http://localhost:3000

### Test User Registration:
1. Click **"Register"** tab
2. Click **"Register as User"**
3. Fill in:
   - Username: testuser
   - Mobile: 1234567890
   - Email: test@test.com
   - Password: test123
4. Click **"Register as User"**
5. You should see: **"User registered successfully!"**

### Test Login:
1. Click **"Login"** tab
2. Email: test@test.com
3. Password: test123
4. Click **"Login"**
5. You should see: **"Login successful!"**

### Verify in Firebase:
1. Go to Firebase Console → Authentication → Users
2. You should see: test@test.com listed!

## Common Errors & Fixes

### Error: "Firebase not initialized"
- Check browser console (F12) for errors
- Make sure you completed steps 1 and 2 above

### Error: "Missing or insufficient permissions"
- Go to Firestore → Rules
- Make sure it says: `allow read, write: if request.time < timestamp.date(...)`

### Error: "auth/operation-not-allowed"
- Email/Password authentication is not enabled
- Go back to step 1 above

## Your Firebase Project
- Project ID: e-waste-management-76052
- Console: https://console.firebase.google.com/project/e-waste-management-76052
