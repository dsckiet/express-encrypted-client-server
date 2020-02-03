const express = require("express");
// const crypto = require("crypto");
const CryptoJS = require("crypto-js");

require("dotenv").config();

const app = express();
const secret = process.env.SECRET_KEY;

app.get("/api/index", async (req, res) => {
  const data = {
    data: { name: "Jethalaal Gada", crush: "Babita Iyer", chances: 0 }
  };

  try {
    const ciphertext = await CryptoJS.AES.encrypt(JSON.stringify(data), secret);
    const bytes = await CryptoJS.AES.decrypt(ciphertext.toString(), secret);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return res.status(200).json({ data: String(ciphertext) });
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, err => {
  err ? console.log(err) : console.log("Server started");
});
