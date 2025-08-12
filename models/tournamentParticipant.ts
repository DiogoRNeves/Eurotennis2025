import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { Tournament } from "./tournament";
  import { Team } from "./team";
  import { Player } from "./player";

  @Table
  export class TournamentParticipant extends Model<TournamentParticipant> {
    @ForeignKey(() => Tournament)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    tournamentId!: number;

    @ForeignKey(() => Team)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    teamId!: number;

    @ForeignKey(() => Player)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    playerId!: number;

    @BelongsTo(() => Tournament)
    tournament!: Tournament;

    @BelongsTo(() => Team)
    team!: Team;

    @BelongsTo(() => Player)
    player!: Player;
  }