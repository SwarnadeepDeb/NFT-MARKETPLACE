import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">NFTMarketplace</div>
      <input type="text" className="navbar-search" placeholder="Search NFTs..." />
      <div className="navbar-buttons">
        <Link to="/dashboard" className="navbar-button">Dashboard</Link>
        <Link to="/create-nft" className="navbar-button">Create NFT</Link>
        <Link to="/list-nft" className="navbar-button">List NFT</Link>
        <Link to="/about" className="navbar-button">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
