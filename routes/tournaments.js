const express = require("express");
const router = express.Router();

// Serve tournaments.ejs for the tournaments route
router.get("/", (req, res) => {
  res.render("tournaments", { title: "Tournaments" });
});

module.exports = router;