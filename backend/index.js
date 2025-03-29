const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Web3 CRM Backend is running!");
});

module.exports = app;
