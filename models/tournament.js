module.exports = (sequelize, DataTypes) => {
    const Tournament = sequelize.define("Tournament", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("singles", "doubles"),
        allowNull: false,
      },
      maxPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfGroups: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    Tournament.associate = (models) => {
      Tournament.hasMany(models.TournamentParticipant, {
        foreignKey: "tournamentId",
      });
    };

    return Tournament;
  };