const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the public directory
app.use(express.static("./public"));

// Serve index.html for the root route
app.get("/", (req, res) => {
  console.log(`Getting index. My man.`);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve tournaments.html for the tournaments route
app.get("/tournaments", (req, res) => {
  console.log(`Getting tournaments.`);
  res.sendFile(path.join(__dirname, "public", "tournaments.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}!`);
});
