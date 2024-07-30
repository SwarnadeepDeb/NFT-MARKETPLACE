require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia :{
      url : 'https://rpc.ankr.com/eth_sepolia',
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.24",
};