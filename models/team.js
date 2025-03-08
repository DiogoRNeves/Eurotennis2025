module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Team.associate = (models) => {
    Team.hasMany(models.TournamentParticipant, {
      foreignKey: "teamId",
    });
  };

  return Team;
};
