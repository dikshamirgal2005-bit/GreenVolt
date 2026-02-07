# GreenVolt - Smart E-Waste Management System

# Problem Statement

Electronic waste such as laptops, mobile phones, batteries, chargers, and cables is increasing rapidly. Many users want to recycle their e-waste but face multiple problems: they do not know which company accepts their product, how to contact them, or how to arrange safe disposal. Door-to-door e-waste collection is rarely available in a simple and trustworthy way.

Recycling companies also face challenges. They receive requests through calls or manual methods, which makes it difficult to manage user details, product information, pickup scheduling, and internal records. There is no centralized system where user e-waste details are automatically stored in the company’s database, and repairable products are often not identified early.

Because of this gap between users and recycling companies, e-waste is often stored at home or disposed of incorrectly, causing environmental harm.

# Proposed Solution

The proposed solution is a Smart E-Waste Collection Platform with two main panels: User Panel and Company (Admin) Panel.

On the user side, users register and add their address in their profile. When they want to recycle an item, they fill in e-waste details such as product type, condition, and upload a photo. The user then selects a recycling company from the available list and submits a pickup request.

Once submitted, the request is automatically sent to the selected company through the system.

On the company side, the recycling company receives the request in real time, views the user and product details, and accepts the request. The company then assigns a pickup agent. The user receives a notification saying that a specific agent is coming to their home to collect the e-waste.

All user e-waste details are automatically added to the company’s database for tracking and management. During pickup, the agent checks whether the product can be repaired. If it is repairable, the agent updates the system and notifies the company admin.

The entire system is built using Firebase for authentication, real-time database, and notifications, ensuring smooth communication between users and companies.

GreenVolt is a React-based e-waste management platform that connects users with certified recycling companies. Users can easily dispose of their e-waste and earn eco-points, while companies can manage collection requests efficiently.

## 🚀 Key Features

### For Users
- **Dashboard**: View eco-points, profile, and quick actions.
- **Add E-Waste**: Upload product details, photos, and get estimated value.
- **Find Centers**: Locate nearby recycling centers.
- **History**: Track past submissions and current status.
- **Profile**: Manage personal details and pickup address.

### For Companies
- **Dashboard**: Overview of total requests and recycling impact.
- **View Requests**: Manage pending, approved, and rejected collection requests.
- **Analytics**: Visualize collection trends and data.
- **Company Profile**: Manage company details and certification.

## 🛠️ Tech Stack
- **Frontend**: React 19
- **Backend**: Firebase (Auth, Firestore)
- **Styling**: CSS3 with modern glassmorphism design

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## ⚙️ Installation & Setup

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd e-waste
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Firebase Configuration**:
    - The project uses Firebase for authentication and database.
    - Ensure `src/firebase.js` is configured with your Firebase project credentials.
    - **Firestore Rules**: Ensure Firestore is in "Test Mode" or has appropriate read/write rules.

## ▶️ How to Run

To start the application in development mode:

```bash
npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.

## 🏗️ Building for Production

To build the app for production (creates a `build` folder):

```bash
npm run build
```

## 📖 Usage Guide

1.  **Sign Up / Login**:
    - Launch the app.
    - Choose **User** or **Company** tab.
    - Users: Register with Name, Mobile, Email.
    - Companies: Register with Company Name, Phone, Email.

2.  **User Workflow**:
    - Log in to see the dashboard.
    - Click **"Add E-Waste Product"**.
    - Upload an image, enter details (Name, Weight, Quantity).
    - Select a Recycling Partner (Company).
    - Submit to earn Eco-Points!

3.  **Company Workflow**:
    - Log in to see the company dashboard.
    - Click **"View Requests"**.
    - Review pending requests (Photo, Details, Pickup Address).
    - **Approve** or **Reject** requests based on validity.

## 📁 Project Structure

```
e-waste/
├── public/          # Static assets (index.html, favicon)
├── src/
│   ├── components/  # React components (Dashboard, Auth, etc.)
│   ├── App.js       # Main application logic
│   ├── firebase.js  # Firebase configuration
│   └── index.js     # Entry point
└── package.json     # Dependencies and scripts
```
