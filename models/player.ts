import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { TournamentParticipant } from "./tournamentParticipant";

@Table
export class Player extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => TournamentParticipant)
  tournamentParticipants!: TournamentParticipant[];
}