const express = require("express");
const router = express.Router();

// Serve index.ejs for the root route
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

module.exports = router;