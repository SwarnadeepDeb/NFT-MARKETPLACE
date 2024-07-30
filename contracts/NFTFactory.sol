// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserNFT.sol";

contract NFTFactory {
    event NFTCollectionCreated(address indexed owner, address collectionAddress);

    function createNFTCollection(string memory name, string memory symbol) external {
        UserNFT collection = new UserNFT(name, symbol, msg.sender);
        emit NFTCollectionCreated(msg.sender, address(collection));
    }
}


// 0xbac9dec2f730bcbb397e7445cce2ac070b74ba18  contract address

// [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "name",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "symbol",
// 				"type": "string"
// 			}
// 		],
// 		"name": "createNFTCollection",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "collectionAddress",
// 				"type": "address"
// 			}
// 		],
// 		"name": "NFTCollectionCreated",
// 		"type": "event"
// 	}
// ]
