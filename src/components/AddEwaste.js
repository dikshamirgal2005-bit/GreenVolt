import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, doc, setDoc, increment } from 'firebase/firestore';
import './AddEwaste.css';

const AddEwaste = ({ companies, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 1,
        weight: '',
        companyId: '',
        imageUrl: '',
        phone: '',
        address: ''
    });
    const [prize, setPrize] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // AI-based prize calculation (simplified)
    const calculatePrize = (weight) => {
        const weightNum = parseFloat(weight);
        if (isNaN(weightNum) || weightNum <= 0) return 0;

        // Prize calculation logic: ₹10 per kg base + bonus for higher weights
        let calculatedPrize = weightNum * 10;
        if (weightNum > 5) calculatedPrize += 50; // Bonus for > 5kg
        if (weightNum > 10) calculatedPrize += 100; // Extra bonus for > 10kg

        return Math.round(calculatedPrize);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'weight') {
            const calculatedPrize = calculatePrize(value);
            setPrize(calculatedPrize);
        }
    };

    const handlePrizeChange = (e) => {
        setPrize(parseInt(e.target.value) || 0);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, imageUrl: '' }));
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.companyId) {
            showMessage('Please select a company', 'error');
            return;
        }

        setLoading(true);
        try {
            const user = auth.currentUser;

            // Add e-waste request to Firestore
            await addDoc(collection(db, 'ewasteRequests'), {
                userId: user.uid,
                userName: user.displayName || formData.name, // Fallback if display name is empty
                userEmail: user.email,
                name: formData.name,
                quantity: parseInt(formData.quantity),
                weight: parseFloat(formData.weight),
                companyId: formData.companyId,
                imageUrl: formData.imageUrl,
                phone: formData.phone,
                address: formData.address,
                prize: parseInt(prize),
                status: 'pending',
                createdAt: new Date().toISOString()
            });

            // Update user's eco points (create document if it doesn't exist)
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                ecoPoints: increment(5)
            }, { merge: true });

            showMessage(`E-waste product added! Earned 5 Eco-Points. Estimated Value: ₹${prize}`, 'success');

            // Reset form
            setFormData({
                name: '',
                quantity: 1,
                weight: '',
                companyId: '',
                imageUrl: '',
                phone: '',
                address: ''
            });
            setPrize(0);
            setImagePreview(null);

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error adding e-waste:', error);
            showMessage('Error adding product. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-ewaste">
            <h2>♻️ Add E-Waste Product</h2>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="ewaste-form">
                <div className="image-upload-section">
                    {imagePreview ? (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                            <div className="remove-image" onClick={removeImage}>✕</div>
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                id="image-upload"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="image-upload" style={{ cursor: 'pointer', flexDirection: 'column' }}>
                                <div className="upload-icon">📸</div>
                                <p>Click to upload product image</p>
                            </label>
                        </>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="product-name">📦 Product Name</label>
                    <input
                        id="product-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Old Laptop, Broken Phone"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="quantity">🔢 Quantity</label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">⚖️ Weight (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="0.5"
                            step="0.1"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">📞 Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your contact number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">📍 Pickup Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full address for pickup"
                        rows="3"
                        required
                        style={{ width: '100%', padding: '12px 16px', border: '1px solid #c8e6c9', borderRadius: '10px', fontSize: '14px', transition: 'all 0.3s', background: '#f8fcf9' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">🏢 Select Recycling Partner</label>
                    <select
                        id="company"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Choose a Company --</option>
                        {companies.map(company => (
                            <option key={company.id} value={company.id}>
                                {company.companyName || company.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="prize">💰 Estimated Value (₹)</label>
                    <input
                        id="prize"
                        type="number"
                        name="prize"
                        value={prize}
                        onChange={handlePrizeChange}
                        placeholder="Estimated value"
                        min="0"
                    />
                    <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                        *Auto-calculated based on weight, but you can edit this.
                    </small>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default AddEwaste;
