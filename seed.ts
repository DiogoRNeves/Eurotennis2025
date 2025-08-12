import fs from "fs";
import path from "path";
import { Player, Team, Tournament, TournamentParticipant } from "./models";

export async function seedDatabase() {
  const teamCount = await Team.count();
  if (teamCount === 0) {
    // Load seed data from JSON files
    const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "teams.json"), "utf8"));
    const tournamentsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "tournaments.json"), "utf8"));
    const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, "seedData", "players.json"), "utf8"));

    // Insert seed data into the database
    const teams = await Team.bulkCreate(teamsData);
    const tournaments = await Tournament.bulkCreate(tournamentsData);

    // Create a map of team names to team IDs
    const teamMap: Record<string, number> = {};
    teams.forEach(team => {
      teamMap[team.name] = team.id;
    });

    // Create a map of tournament names to tournament IDs
    const tournamentMap: Record<string, number> = {};
    tournaments.forEach(tournament => {
      tournamentMap[tournament.name] = tournament.id;
    });

    // Create players
    const players: Player[] = [];
    for (const playerData of playersData) {
      const player = await Player.create({
        name: playerData.name,
      });
      players.push(player);
    }

    // Create tournament participants
    for (const playerData of playersData) {
      const teamId = teamMap[playerData.team];
      const tournamentId = tournamentMap[playerData.tournament];
      const player = players.find(p => p.name === playerData.name);

      if (player) {
        await TournamentParticipant.create({
          tournamentId: tournamentId,
          teamId: teamId,
          playerId: player.id,
        } as any);
      }
    }

    console.log("Seed data inserted");
  } else {
    console.log("Database already seeded");
  }
}