const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", () => {
  //beforeEach 每个测试之前执行
  let simpleStorageFactory, simpleContract;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleContract = await simpleStorageFactory.deploy();
  });
  it("测试初始值是否为0", async () => {
    const currVal = await simpleContract.retrieve();
    const testVal = "0";
    // assert.equal(currVal.toString(), testVal);
    // expect;
    expect(currVal.toString()).to.equal(testVal);
  });

  it("测试store的方法", async () => {
    const storeVal = "7";
    const tx = await simpleContract.store(storeVal);
    await tx.wait(1);
    const currVal = await simpleContract.retrieve();
    assert.equal(currVal.toString(), storeVal);
  });
});
