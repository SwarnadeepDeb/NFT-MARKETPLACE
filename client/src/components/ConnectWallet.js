import React from 'react';
import { ethers } from 'ethers';

const ConnectWallet = ({ UpdateState, updateConnected, Connected, contractABI, contractAddress }) => {
  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        UpdateState({ provider, signer, contract });
        updateConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleDisconnect = () => {
    UpdateState({ provider: null, signer: null, contract: null });
    updateConnected(false);
  };

  return (
    <button onClick={Connected ? handleDisconnect : handleConnect}>
      {Connected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWallet;
