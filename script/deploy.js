const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.getDeployedCode();
  console.log(simpleStorage.target); //ethers v6的写法
  // if (network.config.chainId === 11155111 && process.env.VERIFY_APP_KEYS) {
  //   await simpleStorage.deploymentTransaction().wait(6);
  //   await verify(simpleStorage.target, []);
  // }
  await simpleStorage.deploymentTransaction().wait(1);
  const currFavoriteNumber = await simpleStorage.retrieve();
  console.log(`Current Favorite Number: ${currFavoriteNumber.toString()}`);

  const transactionResponse = await simpleStorage.store("7");
  await transactionResponse.wait(1);
  const newFavoriteNumber = await simpleStorage.retrieve();
  console.log(`Update Favorite Number: ${newFavoriteNumber}`);
  // await simpleStorage.deploy();
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Verified already");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
