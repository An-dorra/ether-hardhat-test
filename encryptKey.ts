/**
 * 加密key
 */

// const fs = require("fs");
import * as fs from "fs";
import { ethers } from "ethers";
import "dotenv/config";
import * as path from "path";

const __dirname = path.resolve();
// const path = require("path");
// const ethers = require("ethers");
(async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const privateKeyEncrypt = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!,
    process.env.PRIVATE_KEY!
  );
  fs.writeFileSync(
    path.resolve(__dirname, "./encryptKey.json"),
    privateKeyEncrypt,
    "utf8"
  );
})();
