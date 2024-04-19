const { ethers } = require("hardhat");

async function main() {
  const testFactory = await ethers.getContractFactory("Test");
  const testContract = await testFactory.deploy();
  console.log("Contract is deployed to " + testContract.target);
  testContract.deploymentTransaction(1);
  const currNum = await testContract.getNumber();
  console.log(currNum.toString());
  await testContract.setNumber(7);
  const updateNum = await testContract.getNumber();
  console.log(updateNum.toString());
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
