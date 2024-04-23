const { network, ethers, getNamedAccounts } = require("hardhat");
const {assert} = require("chai")
const {devChains} = require("../../helper.config")

devChains.includes(network.name) ? describe.skip :
describe("FundMe",async ()=>{
    let fundMe,deployer;
    const sendValue = ethers.parseEther("1");
    beforeEach(async ()=>{
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe",deployer);
    })
    it("allows people to fund and withdraw",async ()=>{
        await fundMe.fund({value:sendValue})
        await fundMe.withdraw()
        const endingBalance = await ethers.provider.getBalance(fundMe.target)
        assert.equal(endingBalance.toString(),"0")
    })
})