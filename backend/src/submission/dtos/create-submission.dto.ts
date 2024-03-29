import { IsNotEmpty, IsString } from 'class-validator';
import { Player } from 'src/data-model/entities';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  tokens: { token: string }[];

  createdBy: Player;
}
