// filepath: /c:/Users/neo16/Downloads/EurotennisTest/EurotennisTest/routes/teams.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Serve teams.ejs for the teams route
router.get("/", async (req, res) => {
  try {
    const teamsDetails = await db.getTeamsDetails();
    // Sort teams by name
    teamsDetails.sort((a, b) => a.name.localeCompare(b.name));
    const tournamentAcronymsDb = await db.Tournament.findAll({
      attributes: ["acronym"],
      order: [["displayOrder", "ASC"]],
    })
    const tournamentAcronyms = tournamentAcronymsDb.map((tournament) => tournament.acronym);

    res.render("teams", { title: "Teams", teamsDetails, tournamentAcronyms });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
