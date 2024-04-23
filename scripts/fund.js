const { ethers,getNamedAccounts } = require("hardhat");

async function main() {
  const sendValue = ethers.parseEther("10")
  const { deployer }= await getNamedAccounts()
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("FundMe deployed successfully")
  const transactionResponse = await fundMe.fund({value:sendValue})
  console.log(JSON.stringify(transactionResponse))
  await transactionResponse.wait(1)
  console.log("successful transaction")
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
