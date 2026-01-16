import React from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
import "../styles/Home.css"
import Navbar from "../components/Navbar";

function Home() {
return (
    <div className="home-wrapper">
        <Navbar />
        
        {/* Hero Section */}
        <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <span className="hero-badge">Smart Restaurant Management</span>
                <h1>Optimize Your Restaurant<br /><span>Inventory & Waste</span></h1>
                <p>
                    Reduce food waste, manage inventory efficiently, and cut operational costs. 
                    Real-time tracking, smart analytics, and sustainability reporting for modern restaurants.
                </p>
                <div className="hero-btns">
                    <Link to="/inventory" className="btn-main">View Inventory</Link>
                    <Link to="/register" className="btn-outline">Get Started</Link>
                </div>
            </div>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar">
            <div className="stat-item">
                <h3>40%</h3>
                <p>Avg Waste Reduction</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <h3>$50k+</h3>
                <p>Cost Savings/Year</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <h3>500+</h3>
                <p>Restaurants Using</p>
            </div>
        </section>

        {/* Features / Shortcut Section */}
        <section className="home-features">
            <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Inventory Tracking</h3>
                <p>Real-time monitoring of stock levels, expiration dates, and ingredient usage across your restaurant.</p>
                <Link to="/inventory">Manage Inventory</Link>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">♻️</div>
                <h3>Waste Management</h3>
                <p>Track and analyze food waste patterns to identify savings opportunities and sustainability improvements.</p>
                <Link to="/waste">View Waste Reports</Link>
            </div>

            <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Smart Alerts</h3>
                <p>Receive notifications for low stock, expiring items, and waste thresholds to make informed decisions.</p>
                <Link to="/login">Sign In</Link>
            </div>
        </section>
        
        <footer className="home-footer">
            <p>&copy; 2026 Restaurant Inventory Pro. All rights reserved.</p>
        </footer>
    </div>
);
}

export default Home;