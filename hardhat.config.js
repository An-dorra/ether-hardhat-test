require("@nomiclabs/hardhat-solhint");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomicfoundation/hardhat-verify");
require("hardhat-gas-reporter");

require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

const { PRIVATE_KEY, SEPOLIA_URL, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: "COINMARKETCAP_API_KEY",
    currency: "USD",
    token: "MATIC",
  },
};
