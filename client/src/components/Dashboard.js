import React, { useEffect } from 'react';
import { ethers, formatEther, parseEther } from 'ethers';
import axios from 'axios';

const NFTMarketplaceAddress = '0xc0640be870583331c39ab3700520722e18bb6531';
const NFTMarketplaceABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "cancelListing",
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
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "ListingCanceled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listNFT",
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
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "NFTListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "NFTSold",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "activeListings",
		"outputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllActiveListings",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTMarketplace.Listing[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getListing",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isListed",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const Dashboard = ({ state, listings, updateListings }) => {

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		if (!state.signer) return;
		const nftMarketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, state.signer);
		try {
			let listings = await nftMarketplaceContract.getAllActiveListings();
			listings=parseFlattenedListings(listings);
			// console.log(`Listings :- ${listings}`);
			const listingsWithMetadata = await Promise.all(listings.map(async (listing) => {
				const metadata = await fetchNFTMetadata(listing.nftContract, listing.tokenId);
				return { ...listing, metadata };
			}));
			console.log(`Listings :- ${listingsWithMetadata}`);
			updateListings(listingsWithMetadata);
		} catch (error) {
			console.error('Error fetching listings:', error);
		}
	};

    const parseFlattenedListings = (flattenedListings) => {
        const listings = [];
        flattenedListings.forEach((listing) => {
            listings.push({
                nftContract: listing[0],
                tokenId: listing[1].toString(),
                seller: listing[2],
                price: listing[3].toString(),
            });
        });
        return listings;
    };

	const fetchNFTMetadata = async (nftContractAddress, tokenId) => {
		const nftContract = new ethers.Contract(nftContractAddress, [
			'function tokenURI(uint256 tokenId) external view returns (string memory)'
		], state.signer);
		try {
			const tokenURI = await nftContract.tokenURI(tokenId);
			const metadataUrl = convertIpfsUrl(tokenURI);
			console.log('Metadata URL:', metadataUrl);
			const metadata = await axios.get(metadataUrl);
			return metadataUrl;
		} catch (error) {
			console.error('Error fetching metadata:', error);
			return null;
		}
	};

	const convertIpfsUrl = (url) => {
		if (url.startsWith('ipfs://')) {
			return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`;
		}
		return url;
	};

	const buyNFT = async (nftContractAddress, tokenId, price) => {
		const nftMarketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, state.signer);
		try {
			const tx = await nftMarketplaceContract.buyNFT(nftContractAddress, tokenId, { value: parseEther(price) });
			await tx.wait();
			alert('NFT bought successfully!');
			fetchListings();
		} catch (error) {
			console.error('Error buying NFT:', error);
		}
	};

	const cancelListing = async (nftContractAddress, tokenId) => {
		const nftMarketplaceContract = new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, state.signer);
		try {
			const tx = await nftMarketplaceContract.cancelListing(nftContractAddress, tokenId);
			await tx.wait();
			alert('Listing canceled successfully!');
			fetchListings();
		} catch (error) {
			console.error('Error canceling listing:', error);
		}
	};

	return (
		<div className="dashboard-container">
			<h2>Listings</h2>
			<ul>
				{listings.map((listing, index) => (
					<li key={index} className="listing-item">
						<p>NFT Contract: {listing.nftContract}</p>
						<p>Token ID: {listing.tokenId}</p>
						<p>Price: {listing.price ? formatEther(listing.price) : 'N/A'} ETH</p>
						{listing.metadata && listing.metadata && (
							<>
								<p>Image URL: {listing.metadata}</p>
								<img src={listing.metadata} alt="NFT" width="200" />
							</>
						)}
						<button onClick={() => buyNFT(listing.nftContract, listing.tokenId, formatEther(listing.price))}>
							Buy
						</button>
						<button className="red" onClick={() => cancelListing(listing.nftContract, listing.tokenId)}>Cancel Listing</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dashboard;
