const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the root directory
app.use(express.static("./"));

// Serve index.html for the root route
app.get("/", (req, res) => {
  console.log(`Getting index.`);
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve index.html for the root route
app.get("/tournaments", (req, res) => {
  res.sendFile(path.join(__dirname, "tournaments.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}. yay!`);
});
