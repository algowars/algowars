import { IQuery } from '@nestjs/cqrs';
import { Username } from 'src/account/domain/username';

export class FindAccountStatsByUsernameQuery implements IQuery {
  constructor(readonly username: Username) {}
}
