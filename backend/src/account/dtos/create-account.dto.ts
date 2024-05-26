import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AccountLabel } from '../labels/account.label';

export class CreateAccountDto {
  @IsString({ message: AccountLabel.ACCOUNT_IS_STRING })
  @MaxLength(50, { message: AccountLabel.ACCOUNT_USERNAME_MAX_LENGTH })
  @IsNotEmpty({ message: AccountLabel.ACCOUNT_USERNAME_NOT_EMPTY })
  username: string;
}
