import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountByIdQuery } from './find-account-by-id.query';
import { AccountDtoRepository } from 'src/account/db/account-dto.repository';
import { AccountDto } from 'src/account/dto/account.dto';

@QueryHandler(FindAccountByIdQuery)
export class FindAccountByIdHandler
  implements IQueryHandler<FindAccountByIdQuery>
{
  constructor(private readonly accountDtoRepository: AccountDtoRepository) {}

  async execute({ id }: FindAccountByIdQuery): Promise<AccountDto> {
    return this.accountDtoRepository.findById(id);
  }
}
