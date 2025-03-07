const fs = require("fs");
const path = require("path");
const db = require("./models");

async function seedDatabase() {
  const teamCount = await db.Team.count();
  if (teamCount === 0) {
    // Load seed data from JSON files
    const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "teams.json"), "utf8"));
    const tournamentsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "tournaments.json"), "utf8"));
    const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "players.json"), "utf8"));

    // Insert seed data into the database
    const teams = await db.Team.bulkCreate(teamsData);
    const tournaments = await db.Tournament.bulkCreate(tournamentsData);

    // Create a map of team names to team IDs
    const teamMap = {};
    teams.forEach(team => {
      teamMap[team.name] = team.id;
    });

    // Create a map of tournament names to tournament IDs
    const tournamentMap = {};
    tournaments.forEach(tournament => {
      tournamentMap[tournament.name] = tournament.id;
    });

    // Create players
    const players = [];
    for (const playerData of playersData) {
      const player = await db.Player.create({
        name: playerData.name,
      });
      players.push(player);
    }

    // Create tournament participants
    for (const playerData of playersData) {
      const teamId = teamMap[playerData.team];
      const tournamentId = tournamentMap[playerData.tournament];
      const player = players.find(p => p.name === playerData.name);

      await db.TournamentParticipant.create({
        tournamentId: tournamentId,
        teamId: teamId,
        playerId: player.id,
      });
    }

    console.log("Seed data inserted");
  } else {
    console.log("Database already seeded");
  }
}

module.exports = seedDatabase;