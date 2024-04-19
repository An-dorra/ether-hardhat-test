const { network } = require("hardhat");
require("dotenv").config();

const { ethUsdPriceFeedNetwork, devChains } = require("../helper.config");
const { fundMeVerify } = require("../utils/fundme-verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let priceFeedAddress;
  const isDevChain = devChains.includes(network.name);

  if (isDevChain) {
    const mockV3Aggregator = await get("MockV3Aggregator");
    priceFeedAddress = mockV3Aggregator.address;
    log("Using MockV3Aggregator...priceFeedAddress is " + priceFeedAddress);
  } else {
    priceFeedAddress = ethUsdPriceFeedNetwork[chainId].ethUsdPriceFeed;
  }
  const args = [priceFeedAddress];

  const contract = await deploy("FundMe", {
    from: deployer,
    args, //priceFeed的地址
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log("Contract deployed successfully");
  log("---------------------------------------------------------");

  //验证合约
  // if (!isDevChain && process.env.ETHERSCAN_API_KEY) {
  //   await fundMeVerify(contract.address, args);
  // }
};

module.exports.tags = ["all", "FundMe"];
