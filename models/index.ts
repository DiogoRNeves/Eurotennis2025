import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { Player } from "./player";
import { Team } from "./team";
import { Tournament } from "./tournament";
import { TournamentParticipant } from "./tournamentParticipant";

import { settings } from '../settings';

// Initialize Sequelize
export const sequelize = new Sequelize(
  settings.databaseName,
  settings.databaseUser,
  settings.databasePassword,
  {
    host: settings.databaseUrl,
    port: settings.databasePort,
    dialect: "mysql",
    logging: false,
    models: [Player, Team, Tournament, TournamentParticipant],
  }
);

// Export models for type-safe imports
export {
  Player,
  Team,
  Tournament,
  TournamentParticipant,
};

// Utility function for team details
export async function getTeamsDetails(teamIds?: number[]) {
  const findOptions: any = {
    include: [
      {
        model: TournamentParticipant,
        include: [
          { model: Player },
          { model: Tournament },
        ],
      },
    ],
  };

  if (teamIds) {
    findOptions.where = { id: { [Op.or]: teamIds } };
  }

  const teamsDbData = await Team.findAll(findOptions);

  const teamsDetails = teamsDbData.map((team: any) => {
    const details: {
      flag: string;
      name: string;
      players: Record<string, { tournament: string; names: string[]; badgeColor?: string }>;
    } = {
      flag: team.flag,
      name: team.name,
      players: {},
    };

    // Use camelCase for associations!
    if (Array.isArray(team.tournamentParticipants)) {
      team.tournamentParticipants.forEach((participant: any) => {
        const tournamentName = participant.tournament?.name;
        const tournamentAcronym = participant.tournament?.acronym;
        const playerName = participant.player?.name;

        if (tournamentAcronym && playerName) {
          if (!details.players[tournamentAcronym]) {
            details.players[tournamentAcronym] = {
              tournament: tournamentName,
              names: [],
              badgeColor: participant.tournament?.badgeColor,
            };
          }
          details.players[tournamentAcronym].names.push(playerName);
        }
      });
    }

    return details;
  });

  return teamsDetails;
}
