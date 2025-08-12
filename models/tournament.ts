import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { TournamentParticipant } from "./tournamentParticipant";

export type TournamentType = "singles" | "doubles";
export type TournamentAcronym = "MS" | "WS" | "MD" | "MxD";

@Table
export class Tournament extends Model<Tournament> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ENUM("singles", "doubles"),
    allowNull: false,
  })
  type!: TournamentType;

  @Column({
    type: DataType.ENUM("MS", "WS", "MD", "MxD"),
    allowNull: false,
  })
  acronym!: TournamentAcronym;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxPlayers!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  numberOfGroups!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  displayOrder!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  badgeColor!: string;

  @HasMany(() => TournamentParticipant)
  tournamentParticipants!: TournamentParticipant[];
}