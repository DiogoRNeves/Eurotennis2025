module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define("Player", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Player.associate = (models) => {
      Player.hasMany(models.TournamentParticipant, {
        foreignKey: "playerId",
        as: "TournamentParticipants",
      });
    };

    return Player;
  };