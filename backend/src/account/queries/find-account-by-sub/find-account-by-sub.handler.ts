import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountBySubQuery } from './find-account-by-sub.query';
import { AccountDtoRepository } from 'src/account/db/account-dto.repository';
import { AccountDto } from 'src/account/dto/account.dto';

@QueryHandler(FindAccountBySubQuery)
// FindAccountBySubHandler is a query handler that handles the FindAccountBySubQuery.
// It implements the IQueryHandler interface to handle queries of type FindAccountBySubQuery.
export class FindAccountBySubHandler implements IQueryHandler<FindAccountBySubQuery> {
  constructor(
    private readonly accountDtoRepository: AccountDtoRepository, // Injects the AccountDtoRepository to fetch account data.
  ) { }

  // The execute method processes the FindAccountBySubQuery.
  async execute({ sub }: FindAccountBySubQuery): Promise<AccountDto> {
    // Finds an account by its 'sub' field using the AccountDtoRepository and returns the AccountDto.
    return this.accountDtoRepository.findBySub(sub);
  }
}
