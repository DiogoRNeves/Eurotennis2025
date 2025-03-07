// filepath: /c:/Users/neo16/Downloads/EurotennisTest/EurotennisTest/routes/teams.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Serve teams.ejs for the teams route
router.get("/", async (req, res) => {
  try {
    const teamCount = await db.Team.count();
    res.render("teams", { title: "Teams", teamCount });
  } catch (error) {
    console.error("Error fetching team count:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;