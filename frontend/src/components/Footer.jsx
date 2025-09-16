import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>CampusFind</h4>
          <p>Find & Recover With Ease.</p>
        </div>
        <div className="footer-section">
          <h4>Site</h4>
          <ul>
            <li><Link to="/report">Report Lost</Link></li>
            <li><Link to="/report">Report Found</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><span>Customer Support</span></li>
            <li><span>Terms & Conditions</span></li>
            <li><span>Privacy Policy</span></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: talktoprojects@campusfind.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CampusFind. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;