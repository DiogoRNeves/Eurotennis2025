const express = require("express");
const router = express.Router();

// Serve orderofplay.ejs for the orderofplay route
router.get("/", (req, res) => {
  res.render("orderOfPlay", { title: "Order of Play" });
});

module.exports = router;