import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { TournamentParticipant } from "./tournamentParticipant";

@Table
export class Team extends Model<Team> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  flag!: string;

  @HasMany(() => TournamentParticipant)
  tournamentParticipants!: TournamentParticipant[];
}
