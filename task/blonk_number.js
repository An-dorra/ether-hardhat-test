const { task } = require("hardhat/config");

task("blonk-number", "Prints the blonk number", async (taskArgs, hre) => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log("current blonk number:" + blockNumber);
});

module.exports = {};
