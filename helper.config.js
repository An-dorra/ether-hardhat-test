const ethUsdPriceFeedNetwork = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  137: {
    name: "Polygon",
    ethUsdPriceFeed: "0xF0d50568e3A7e8259E16663972b11910F89BD8e7",
  },
};

const devChains = ["hardhat", "localhost"];

const DECIMALS = 8;
const INITIAL_ANSWER = 200000000;

module.exports = {
  ethUsdPriceFeedNetwork,
  devChains,
  DECIMALS,
  INITIAL_ANSWER,
};
