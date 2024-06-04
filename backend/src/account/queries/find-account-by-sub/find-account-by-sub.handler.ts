import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountBySubQuery } from './find-account-by-sub.query';
import { AccountDtoRepository } from 'src/account/db/account-dto.repository';
import { AccountDto } from 'src/account/dto/account.dto';

@QueryHandler(FindAccountBySubQuery)
export class FindAccountBySubHandler
  implements IQueryHandler<FindAccountBySubQuery>
{
  constructor(private readonly accountDtoRepository: AccountDtoRepository) {}

  async execute({ sub }: FindAccountBySubQuery): Promise<AccountDto> {
    return this.accountDtoRepository.findBySub(sub);
  }
}
