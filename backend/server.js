const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Web3 CRM Backend is running on Railway!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Keeping server alive...");
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Keeping server alive...");
});

// Prevent Railway from stopping the container
setInterval(() => console.log("Server is still running..."), 60000);
