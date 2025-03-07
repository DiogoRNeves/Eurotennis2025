const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Player = require("./player")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.Tournament = require("./tournament")(sequelize, Sequelize);
db.TournamentParticipant = require("./tournamentParticipant")(sequelize, Sequelize);

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;