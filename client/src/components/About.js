import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1>About NFT Marketplace</h1>
      <section className="about-section">
        <h2>Overview</h2>
        <p>
          The NFT Marketplace is a decentralized platform where users can buy, sell, and trade Non-Fungible Tokens (NFTs). Built on blockchain technology, it ensures secure and transparent transactions. Our marketplace supports a wide range of digital assets including art, music, collectibles, and more.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li><strong>Browse Listings:</strong> Explore a variety of NFTs listed by different creators.</li>
          <li><strong>Buy NFTs:</strong> Purchase NFTs securely using cryptocurrency.</li>
          <li><strong>List NFTs:</strong> Easily list your NFTs for sale with our user-friendly interface.</li>
          <li><strong>Cancel Listings:</strong> Cancel your NFT listings at any time if you change your mind.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Technology</h2>
        <p>
          Our marketplace leverages smart contracts on the Ethereum blockchain to facilitate transactions. This ensures that all trades are executed in a trustless and automated manner. By utilizing Ethereum’s robust infrastructure, we offer a secure and efficient marketplace for NFT enthusiasts.
        </p>
      </section>

      <h1>About NFT Creator</h1>
      <section className="about-section">
        <h2>Overview</h2>
        <p>
          The NFT Creator component empowers users to mint their own NFTs. Whether you are an artist, musician, or a digital creator, our platform provides an easy-to-use interface for creating and launching your own NFTs.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li><strong>Create NFTs:</strong> Mint new NFTs with customizable metadata including title, description, and image.</li>
          <li><strong>Metadata Storage:</strong> Store metadata securely on IPFS, ensuring decentralization and permanence.</li>
          <li><strong>Easy Integration:</strong> Seamlessly integrate with our marketplace to list your newly created NFTs for sale.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Technology</h2>
        <p>
          The NFT Creator uses smart contracts to mint new NFTs on the Ethereum blockchain. By utilizing ERC-721 or ERC-1155 standards, we ensure that your NFTs are interoperable and can be traded on various platforms. Our integration with IPFS provides decentralized storage for your NFT metadata, enhancing security and longevity.
        </p>
      </section>
    </div>
  );
};

export default About;
