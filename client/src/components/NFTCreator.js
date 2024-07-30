// src/components/NFTCreator.js

import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import FromData from 'form-data';

const NFTFactoryAddress = "0xbac9dec2f730bcbb397e7445cce2ac070b74ba18";
const NFTFactoryABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "createNFTCollection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "collectionAddress",
				"type": "address"
			}
		],
		"name": "NFTCollectionCreated",
		"type": "event"
	}
]

const UserNFTABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "initialOwner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mintNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZmI3M2EyNS1jNjY0LTQ0OTEtODVlYy0xOWJkMzFlNTU2MzciLCJlbWFpbCI6InN1Ymhvaml0ZDIyMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNGNiNDUwZTkxM2QxMjY0ZmQxMDUiLCJzY29wZWRLZXlTZWNyZXQiOiJjYzQyOWNiNzNkZDkwYjI0MDBjMjk0ZDIxOTk5OTY3MzdmMWYzYTc2OTFkYzY0ZjA1ZDRlNjdhZjVjYjhlZjE4IiwiaWF0IjoxNzIwNTM1MTg5fQ.Fu0DeKZIZQj86I7YGf1hc5RIT1zMSRZlfamrvY9PB_0'

const NFTCreator = ({ state }) => {
    const [option, setOption] = useState('create');
    const [collectionName, setCollectionName] = useState('');
    const [collectionSymbol, setCollectionSymbol] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [tokenDescription, setTokenDescription] = useState('');
    const [collectionAddress, setCollectionAddress] = useState('');
    const [newCollectionAddress, setNewCollectionAddress] = useState(null);
    const [mintedTokenAddress, setMintedTokenAddress] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadToLocalIPFS = async (file) => {
		const formData=new FormData();
		formData.append('file',file);
		const pinataMetadata=JSON.stringify({
			name:file.name,
		});
		formData.append('pinataMetadata',pinataMetadata);
		const pinataOptions=JSON.stringify({
			cidVersion:0,
		});
		formData.append('pinataOptions',pinataOptions);
		try{
			const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
			  maxBodyLength: "Infinity",
			  headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
				'Authorization': `Bearer ${JWT}`
			  }
			});
			return `ipfs://${res.data.IpfsHash}`;
		} catch(error){
			console.error('Error uploading file to pinata',error);
			return null;
		}
    };

    const createNFTCollection = async () => {
        if (!collectionName || !collectionSymbol) return;

        const nftFactoryContract = new ethers.Contract(NFTFactoryAddress, NFTFactoryABI, state.signer);

        nftFactoryContract.on("NFTCollectionCreated", (owner, collectionAddress, event) => {
            console.log(`NFTCollectionCreated event: Owner - ${owner}, Collection Address - ${collectionAddress}`);
            event.removeListener();
            setNewCollectionAddress(collectionAddress);
            alert('NFT Collection created successfully!');
        });

        try {
            const tx = await nftFactoryContract.createNFTCollection(collectionName, collectionSymbol);
            const receipt = await tx.wait();
            console.log('Transaction Receipt:', receipt);
        } catch (error) {
            console.error('Error creating NFT collection:', error);
        }
    };

	const approveNFT= async (userNFTContract,spender,tokenId)=>{
		try{
			const tx=await userNFTContract.approve(spender,tokenId);
			await tx.wait();

		}catch(error){
			console.error("Error approving NFT:",error);
		}
	};

    const mintNFT = async () => {
        if (!selectedFile || !tokenDescription || !collectionAddress) return;

        const tokenURI = await uploadToLocalIPFS(selectedFile);
        if (!tokenURI) return;

        const userNFTContract = new ethers.Contract(collectionAddress, UserNFTABI, state.signer);

        try {
            const tx = await userNFTContract.mintNFT(await state.signer.getAddress(), tokenURI);
            const receipt = await tx.wait();
            userNFTContract.on('Transfer',async(from,to,tokenId)=>{
				console.log(`TokenId: ${tokenId}`);
				await approveNFT(userNFTContract,'0xc0640be870583331c39ab3700520722e18bb6531',tokenId);
				setMintedTokenAddress(tokenId);
			});

            alert('NFT minted successfully!');
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    };

    return (
        <div>
            <h1>NFT Creator</h1>
            <div>
                <button onClick={() => setOption('create')}>Create NFT Collection</button>
                <button onClick={() => setOption('mint')}>Mint NFT</button>
            </div>

            {option === 'create' && (
                <div>
                    <h2>Create NFT Collection</h2>
                    <input
                        type="text"
                        placeholder="Collection Name"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Collection Symbol"
                        value={collectionSymbol}
                        onChange={(e) => setCollectionSymbol(e.target.value)}
                    />
                    <button onClick={createNFTCollection}>Create Collection</button>

                    {newCollectionAddress && (
                        <div>
                            <p>New Collection Address: {newCollectionAddress}</p>
                            <h2>Mint NFT for New Collection</h2>
                            <input type="file" onChange={handleFileChange} />
                            <input
                                type="text"
                                placeholder="NFT Description"
                                value={tokenDescription}
                                onChange={(e) => setTokenDescription(e.target.value)}
                            />
                            <button onClick={mintNFT}>Mint NFT</button>
                        </div>
                    )}
                </div>
            )}

            {option === 'mint' && (
                <div>
                    <h2>Mint NFT</h2>
                    <input
                        type="text"
                        placeholder="Existing Collection Address"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <input
                        type="text"
                        placeholder="NFT Description"
                        value={tokenDescription}
                        onChange={(e) => setTokenDescription(e.target.value)}
                    />
                    <button onClick={() => mintNFT(collectionAddress)}>Mint NFT</button>

                    {mintedTokenAddress && (
                        <div>
                            <p>Minted Token ID: {mintedTokenAddress}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NFTCreator;
