// filepath: /c:/Users/neo16/Downloads/EurotennisTest/EurotennisTest/routes/teams.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Serve teams.ejs for the teams route
router.get("/", async (req, res) => {
  try {
    const teamsDbData = await db.Team.findAll({
      include: [
        {
          model: db.TournamentParticipant,
          include: [
            {
              model: db.Player,
            },
            {
              model: db.Tournament,
            },
          ],
        },
      ],
    });
    const teamsDetails = teamsDbData.map((team) => {
      const details = {
        flag: team.flag,
        name: team.name,
        players: {},
      };

      team.TournamentParticipants.forEach((participant) => {
        const tournamentName = participant.Tournament.name;
        const touranmentAcronyn = participant.Tournament.acronym;
        const playerName = participant.Player.name;
        if (!details.players[touranmentAcronyn]) {
          details.players[touranmentAcronyn] = {
            tournament: tournamentName,
            names: [],
          };
        }
        details.players[touranmentAcronyn].names.push(playerName);
      });

      return details;
    });

    res.render("teams", { title: "Teams", teamsDetails });
  } catch (error) {
    console.error("Error fetching team count:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
