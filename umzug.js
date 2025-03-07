const { Umzug, SequelizeStorage } = require('umzug');
const { Sequelize } = require('sequelize'); //Assuming you are using sequelize.

// Replace with your database connection details
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false, // Disable logging for migrations
  }
);

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

module.exports = umzug;