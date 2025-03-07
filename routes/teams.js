const express = require("express");
const router = express.Router();

// Serve teams.ejs for the orderofplay route
router.get("/", (req, res) => {
  res.render("teams", { title: "Teams" });
});

module.exports = router;