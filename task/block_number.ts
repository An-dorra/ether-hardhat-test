import { task } from "hardhat/config";

export default task(
  "block-number",
  "Prints the block number",
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log("current block number:" + blockNumber);
  }
);
