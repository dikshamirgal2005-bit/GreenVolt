import React from 'react';
import './LearnMore.css';

const LearnMore = () => {
    return (
        <div className="learn-more">
            <h2>E-Waste Management Guidelines</h2>
            
            <div className="guidelines-container">
                <section className="guideline-section">
                    <h3>📖 How to Use This Website</h3>
                    <ol>
                        <li><strong>Register/Login:</strong> Create an account as a User or Company. Users can submit e-waste, companies can collect it.</li>
                        <li><strong>Dashboard Overview:</strong> After login, you'll see four main sections - Add E-Waste, Finding Centers, History, and Learn More.</li>
                        <li><strong>Add E-Waste Product:</strong> Click this box to submit your e-waste. Upload a photo, enter details (name, quantity, weight), and the AI will calculate eco points. Select a company to handle your e-waste.</li>
                        <li><strong>Finding Centers:</strong> Locate nearby e-waste collection centers with addresses, phone numbers, and operating hours.</li>
                        <li><strong>History:</strong> View all your past submissions. Edit or delete items using the three-dot menu.</li>
                        <li><strong>Eco Points:</strong> Earn points for each submission based on weight. Track your points in the top navigation bar.</li>
                        <li><strong>Company Selection:</strong> Choose from registered companies who will collect your e-waste responsibly.</li>
                    </ol>
                </section>

                <section className="guideline-section">
                    <h3>🌍 What is E-Waste?</h3>
                    <p>
                        Electronic waste (e-waste) refers to discarded electrical or electronic devices. 
                        This includes computers, phones, TVs, batteries, and other electronic equipment 
                        that are no longer in use.
                    </p>
                </section>

                <section className="guideline-section">
                    <h3>⚠️ Why is E-Waste Dangerous?</h3>
                    <ul>
                        <li>Contains toxic materials like lead, mercury, and cadmium</li>
                        <li>Can contaminate soil and water if not disposed properly</li>
                        <li>Harmful to human health and the environment</li>
                        <li>Non-biodegradable and occupies landfill space</li>
                    </ul>
                </section>

                <section className="guideline-section">
                    <h3>♻️ How to Dispose E-Waste Properly</h3>
                    <ol>
                        <li><strong>Don't throw in regular trash:</strong> E-waste should never go in your regular bin</li>
                        <li><strong>Use certified centers:</strong> Drop off at authorized e-waste collection centers</li>
                        <li><strong>Donate working items:</strong> If still functional, donate to schools or NGOs</li>
                        <li><strong>Data security:</strong> Always wipe personal data before disposal</li>
                        <li><strong>Remove batteries:</strong> Separate and dispose batteries properly</li>
                    </ol>
                </section>

                <section className="guideline-section">
                    <h3>✅ What Can Be Recycled?</h3>
                    <div className="recyclable-grid">
                        <div className="recyclable-item">
                            <span className="icon">💻</span>
                            <p>Computers & Laptops</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">📱</span>
                            <p>Mobile Phones</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">📺</span>
                            <p>TVs & Monitors</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">🖨️</span>
                            <p>Printers & Scanners</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">🔋</span>
                            <p>Batteries</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">🎮</span>
                            <p>Gaming Consoles</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">📷</span>
                            <p>Cameras</p>
                        </div>
                        <div className="recyclable-item">
                            <span className="icon">🎧</span>
                            <p>Audio Devices</p>
                        </div>
                    </div>
                </section>

                <section className="guideline-section">
                    <h3>🌟 Benefits of Proper E-Waste Disposal</h3>
                    <ul>
                        <li><strong>Environmental Protection:</strong> Reduces pollution and conserves resources</li>
                        <li><strong>Resource Recovery:</strong> Precious metals and materials can be recovered</li>
                        <li><strong>Job Creation:</strong> Supports the recycling industry</li>
                        <li><strong>Health Safety:</strong> Prevents exposure to toxic substances</li>
                        <li><strong>Earn Rewards:</strong> Get eco points for responsible disposal</li>
                    </ul>
                </section>

                <section className="guideline-section tips">
                    <h3>💡 Quick Tips</h3>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <h4>Before Disposal</h4>
                            <p>Backup your data and perform a factory reset</p>
                        </div>
                        <div className="tip-card">
                            <h4>Packaging</h4>
                            <p>Pack items safely to prevent damage during transport</p>
                        </div>
                        <div className="tip-card">
                            <h4>Documentation</h4>
                            <p>Keep receipts for tax deductions (if applicable)</p>
                        </div>
                        <div className="tip-card">
                            <h4>Regular Disposal</h4>
                            <p>Don't hoard old electronics - dispose regularly</p>
                        </div>
                    </div>
                </section>

                <section className="guideline-section cta">
                    <h3>🚀 Take Action Now!</h3>
                    <p>
                        Every piece of e-waste disposed responsibly makes a difference. 
                        Start your journey towards a cleaner planet today!
                    </p>
                    <div className="stats">
                        <div className="stat">
                            <strong>50M+</strong>
                            <p>Tons of e-waste generated annually</p>
                        </div>
                        <div className="stat">
                            <strong>80%</strong>
                            <p>E-waste ends up in landfills</p>
                        </div>
                        <div className="stat">
                            <strong>100%</strong>
                            <p>E-waste is recyclable</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LearnMore;
