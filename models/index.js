const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Player = require("./player")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.Tournament = require("./tournament")(sequelize, Sequelize);
db.TournamentParticipant = require("./tournamentParticipant")(
  sequelize,
  Sequelize
);

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.getTeamsDetails = async (teamIds) => {
  let findOptions = {
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
  };

  if (teamIds) {
    findOptions.where = { id: { [DataTypes.Op.Or]: teamIds } };
  }

  const teamsDbData = await db.Team.findAll(findOptions);
  const teamsDetails = teamsDbData.map((team) => {
    const details = {
      flag: team.flag,
      name: team.name,
      players: {},
    };

    team.TournamentParticipants.forEach((participant) => {
      const tournamentName = participant.Tournament.name;
      const tournamentAcronym = participant.Tournament.acronym;
      const playerName = participant.Player.name;
      if (!details.players[tournamentAcronym]) {
        details.players[tournamentAcronym] = {
          tournament: tournamentName,
          names: [],
          badgeColor: participant.Tournament.badgeColor
        };
      }
      details.players[tournamentAcronym].names.push(playerName);
    });

    return details;
  });

  return teamsDetails;
};

module.exports = db;
