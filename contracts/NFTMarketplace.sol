// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    struct Listing {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    // Mapping from NFT contract address to token ID to listing details
    mapping(address => mapping(uint256 => Listing)) public listings;
    // Array of all active listings
    Listing[] public activeListings;
    // Mapping to check if a listing exists in the active listings array
    mapping(address => mapping(uint256 => bool)) public isListed;

    event NFTListed(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTSold(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
    event ListingCanceled(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller
    );

    // List an NFT for sale
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(
            nft.getApproved(tokenId) == address(this) ||
                nft.isApprovedForAll(msg.sender, address(this)),
            "Not approved"
        );

        listings[nftContract][tokenId] = Listing(nftContract, tokenId, msg.sender, price);
        activeListings.push(Listing(nftContract, tokenId, msg.sender, price));
        isListed[nftContract][tokenId] = true;

        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    // Buy a listed NFT
    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(msg.value >= listing.price, "Insufficient funds sent");

        IERC721 nft = IERC721(nftContract);
        require(
            nft.ownerOf(tokenId) == listing.seller,
            "Seller no longer owns the NFT"
        );

        // Transfer the NFT to the buyer
        nft.transferFrom(listing.seller, msg.sender, tokenId);

        // Transfer the payment to the seller
        payable(listing.seller).transfer(listing.price);

        // Refund any excess payment
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        // Remove the listing from active listings
        removeListing(nftContract, tokenId);
        delete listings[nftContract][tokenId];
        isListed[nftContract][tokenId] = false;

        emit NFTSold(nftContract, tokenId, msg.sender, listing.price);
    }

    // Cancel a listing
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not the seller");

        // Remove the listing from active listings
        removeListing(nftContract, tokenId);
        delete listings[nftContract][tokenId];
        isListed[nftContract][tokenId] = false;

        emit ListingCanceled(nftContract, tokenId, msg.sender);
    }

    // Internal function to remove a listing from the active listings array
    function removeListing(address nftContract, uint256 tokenId) internal {
        uint256 length = activeListings.length;
        for (uint256 i = 0; i < length; i++) {
            if (
                activeListings[i].nftContract == nftContract &&
                activeListings[i].tokenId == tokenId
            ) {
                activeListings[i] = activeListings[length - 1];
                activeListings.pop();
                break;
            }
        }
    }

    // Getter function to get listing details for a specific NFT
    function getListing(address nftContract, uint256 tokenId) external view returns (address seller, uint256 price) {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller != address(0), "Listing does not exist");
        return (listing.seller, listing.price);
    }

    // Getter function to get all active listings
    function getAllActiveListings() external view returns (Listing[] memory) {
        return activeListings;
    }

    // Fallback function to accept Ether
    receive() external payable {}

    fallback() external payable {}
}
