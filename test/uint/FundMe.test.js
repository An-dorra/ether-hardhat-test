const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { assert, expect } = require("chai");
const { devChains } = require("../../helper.config");

!devChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", function () {
      let fundMe;
      let deployer;
      let mockV3Aggregator;
      const sendValue = ethers.parseEther("10");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]); // Deploy all contracts from "deploy" folder
        fundMe = await ethers.getContract("FundMe", deployer);
        mockV3Aggregator = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });

      describe("constructor", async function () {
        it("Sets the aggregator address correctly", async function () {
          const response = await fundMe.priceFeed();
          assert.equal(response, await mockV3Aggregator.getAddress());
        });
      });
      describe("fund", async () => {
        // it("Fails if you don't send enough ETH", async () => {
        //   await expect(fundMe.fund()).to.be.revertedWith(
        //     "You need to send more eth!"
        //   );
        // });
        it("updated the amount funded data structure", async function () {
          await fundMe.fund({ value: sendValue });
          const response = await fundMe.addressToAmountFuned(deployer);
          assert.equal(response.toString(), sendValue.toString());
        });
        it("Adds funder to array of funders", async () => {
          await fundMe.fund({ value: sendValue });
          const fundList = await fundMe.funders(0);
          assert.equal(fundList, deployer);
        });
      });
      describe("withdraw", async () => {
        beforeEach(async () => {
          await fundMe.fund({ value: sendValue });
        });
        it("withdraw ETH from a single funder", async () => {
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          ); //获取合约地址的余额
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          ); //获取部署者的地址余额

          const transactionResponse = await fundMe.withdraw(); //提取交易
          const transactionReceipt = await transactionResponse.wait(1);

          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = gasUsed * gasPrice; //计算花费的gas

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance + startingDeployerBalance,
            endingDeployerBalance + gasCost
          ); //合约地址的余额 + 部署者的地址余额 = 提取成功后部署者的地址余额 + gas花费
        });
        it("allows us to withdraw with multiple funders", async () => {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i]);
            await fundMeConnectedContract.fund({ value: sendValue });
          }
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          ); //获取合约地址的余额
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          ); //获取部署者的地址余额

          const transactionResponse = await fundMe.withdraw(); //提取交易
          const transactionReceipt = await transactionResponse.wait(1);

          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = gasUsed * gasPrice; //计算花费的gas

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance + startingDeployerBalance,
            endingDeployerBalance + gasCost
          ); //合约地址的余额 + 部署者的地址余额 = 提取成功后部署者的地址余额 + gas花费
          await expect(fundMe.funders(0)).to.be.reverted;
          for (i = 1; i < 6; i++) {
            assert.equal(
              await fundMe.addressToAmountFuned(accounts[i].address),
              0
            );
          }
        });
        it("Only allows the owner to withdraw", async () => {
          const accounts = await ethers.getSigners();
          const attackerConnectContract = await fundMe.connect(accounts[1]);
          expect(attackerConnectContract.withdraw()).to.be.revertedWith(
            "NotOwner"
          );
        });
      });

      // cheap - with - draw
      describe("cheap withdraw testing", async () => {
        beforeEach(async () => {
          await fundMe.fund({ value: sendValue });
        });
        it("withdraw ETH from a single funder", async () => {
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          ); //获取合约地址的余额
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          ); //获取部署者的地址余额

          const transactionResponse = await fundMe.cheapWithDraw(); //提取交易
          const transactionReceipt = await transactionResponse.wait(1);

          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = gasUsed * gasPrice; //计算花费的gas

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance + startingDeployerBalance,
            endingDeployerBalance + gasCost
          ); //合约地址的余额 + 部署者的地址余额 = 提取成功后部署者的地址余额 + gas花费
        });
        it("allows us to withdraw with multiple funders", async () => {
          const accounts = await ethers.getSigners();
          for (let i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundMe.connect(accounts[i]);
            await fundMeConnectedContract.fund({ value: sendValue });
          }
          const startingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          ); //获取合约地址的余额
          const startingDeployerBalance = await ethers.provider.getBalance(
            deployer
          ); //获取部署者的地址余额

          const transactionResponse = await fundMe.cheapWithDraw(); //提取交易
          const transactionReceipt = await transactionResponse.wait(1);

          const { gasUsed, gasPrice } = transactionReceipt;
          const gasCost = gasUsed * gasPrice; //计算花费的gas

          const endingFundMeBalance = await ethers.provider.getBalance(
            fundMe.target
          );
          const endingDeployerBalance = await ethers.provider.getBalance(
            deployer
          );

          assert.equal(endingFundMeBalance, 0);
          assert.equal(
            startingFundMeBalance + startingDeployerBalance,
            endingDeployerBalance + gasCost
          ); //合约地址的余额 + 部署者的地址余额 = 提取成功后部署者的地址余额 + gas花费
          await expect(fundMe.funders(0)).to.be.reverted;
          for (i = 1; i < 6; i++) {
            assert.equal(
              await fundMe.addressToAmountFuned(accounts[i].address),
              0
            );
          }
        });
        it("Only allows the owner to withdraw", async () => {
          const accounts = await ethers.getSigners();
          const attackerConnectContract = await fundMe.connect(accounts[1]);
          expect(attackerConnectContract.cheapWithDraw()).to.be.revertedWith(
            "NotOwner"
          );
        });
      });
    });
