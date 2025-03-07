module.exports = (sequelize, DataTypes) => {
    const TournamentParticipant = sequelize.define("TournamentParticipant", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    TournamentParticipant.associate = (models) => {
      TournamentParticipant.belongsTo(models.Tournament, {
        foreignKey: "tournamentId",
        allowNull: false,
      });
      TournamentParticipant.belongsTo(models.Team, {
        foreignKey: "teamId",
        allowNull: false,
      });
      TournamentParticipant.belongsTo(models.Player, {
        foreignKey: "playerId",
        allowNull: false,
      });
    };

    return TournamentParticipant;
  };