const { task } = require("hardhat/config");

task("block-number", "Prints the block number", async (taskArgs, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log("current block number:" + blockNumber);
});

module.exports = {};
