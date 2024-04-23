const { ethers,getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer }= await getNamedAccounts()
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("funding.....")
  const transactionResponse = await fundMe.withdraw()
  console.log(JSON.stringify(transactionResponse))
  await transactionResponse.wait(1)
  console.log("withdraw successful")
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
