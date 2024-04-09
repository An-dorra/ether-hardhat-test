/**
 * 加密key
 */

const fs = require("fs");
const path = require("path");
const ethers = require("ethers");
require("dotenv").config();
(async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const privateKeyEncrypt = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync(
    path.resolve(__dirname, "./encryptKey.json"),
    privateKeyEncrypt,
    "utf8"
  );
})();
