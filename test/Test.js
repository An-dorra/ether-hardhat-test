const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Test", () => {
  let testFactory, testContract;
  beforeEach(async () => {
    testFactory = await ethers.getContractFactory("Test");
    testContract = await testFactory.deploy();
    testContract.deploymentTransaction(1);
  });
  it("Number Should is 0", async () => {
    const number = await testContract.getNumber();
    expect(number.toString()).to.equal("0");
  });
});
