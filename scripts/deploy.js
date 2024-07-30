async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy();
    await marketplace.deployed();
    console.log("NFTMarketplace deployed to:", marketplace.address);

    const NFTFactory = await ethers.getContractFactory("NFTFactory");
    const factory = await NFTFactory.deploy();
    await factory.deployed();
    console.log("NFTFactory deployed to:", factory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
