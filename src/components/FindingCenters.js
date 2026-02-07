import React from 'react';
import './FindingCenters.css';

const FindingCenters = () => {
    // Dummy data for e-waste collection centers
    const centers = [
        {
            id: 1,
            name: 'Green E-Waste Hub',
            address: '123 Main Street, Delhi',
            phone: '011-1234-5678',
            distance: '2.5 km',
            hours: '9:00 AM - 6:00 PM',
            rating: 4.5
        },
        {
            id: 2,
            name: 'EcoRecycle Center',
            address: '456 Park Avenue, Mumbai',
            phone: '022-9876-5432',
            distance: '3.8 km',
            hours: '10:00 AM - 7:00 PM',
            rating: 4.7
        },
        {
            id: 3,
            name: 'Tech Waste Solutions',
            address: '789 Tech Park, Bangalore',
            phone: '080-5555-6666',
            distance: '5.2 km',
            hours: '8:00 AM - 8:00 PM',
            rating: 4.3
        },
        {
            id: 4,
            name: 'Digital Recycling Point',
            address: '321 Green Road, Pune',
            phone: '020-7777-8888',
            distance: '6.1 km',
            hours: '9:00 AM - 5:00 PM',
            rating: 4.6
        }
    ];

    return (
        <div className="finding-centers">
            <h2>E-Waste Collection Centers Near You</h2>
            <p className="subtitle">Find the nearest center to drop off your e-waste</p>
            
            <div className="centers-list">
                {centers.map((center) => (
                    <div key={center.id} className="center-card">
                        <div className="center-icon">📍</div>
                        <div className="center-info">
                            <h3>{center.name}</h3>
                            <p className="address">📌 {center.address}</p>
                            <p className="phone">📞 {center.phone}</p>
                            <div className="center-meta">
                                <span className="distance">🚗 {center.distance}</span>
                                <span className="hours">🕐 {center.hours}</span>
                                <span className="rating">⭐ {center.rating}</span>
                            </div>
                        </div>
                        <div className="center-actions">
                            <button className="directions-btn">Get Directions</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindingCenters;
