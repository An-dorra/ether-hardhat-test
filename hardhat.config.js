require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

require("./task/block_number");
const { PRIVATE_KEY, RPC_URL, VERIFY_APP_KEYS } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: VERIFY_APP_KEYS,
  },
};
