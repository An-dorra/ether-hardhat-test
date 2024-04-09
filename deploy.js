require("dotenv").config();
const { RPC_URL, PRIVATE_KEY } = process.env;
// require("./encryptKey");
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  // const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const walletEncryptJson = fs.readFileSync(
    path.resolve(__dirname, "./encryptKey.json"),
    "utf8"
  );
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    walletEncryptJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync(
    path.resolve(__dirname, "./SimpleStorage_sol_SimpleStorage.abi"),
    "utf8"
  );
  const binary = fs.readFileSync(
    path.resolve(__dirname, "./SimpleStorage_sol_SimpleStorage.bin"),
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  // const transactionReceipt = await contract.deployTransaction.wait(1); //交易回执
  const currFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currFavoriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  await transactionResponse.wait(1);
  const newFavoriteNumber = await contract.retrieve();
  console.log(`Update Favorite Number: ${newFavoriteNumber}`);
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
