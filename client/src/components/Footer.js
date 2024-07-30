import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are the leading NFT marketplace offering a wide variety of digital assets.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@mynft.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Twitter: @mynft</p>
          <p>Facebook: MyNFT Marketplace</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 MyNFT Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
