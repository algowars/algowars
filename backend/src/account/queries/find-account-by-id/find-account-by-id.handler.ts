import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccountByIdQuery } from './find-account-by-id.query';
import { AccountDtoRepository } from 'src/account/db/account-dto.repository';
import { AccountDto } from 'src/account/dto/account.dto';

@QueryHandler(FindAccountByIdQuery)
// FindAccountByIdHandler is a query handler that handles the FindAccountByIdQuery.
// It implements the IQueryHandler interface to handle queries of type FindAccountByIdQuery.
export class FindAccountByIdHandler implements IQueryHandler<FindAccountByIdQuery> {
  constructor(
    private readonly accountDtoRepository: AccountDtoRepository, // Injects the AccountDtoRepository to fetch account data.
  ) { }

  // The execute method processes the FindAccountByIdQuery.
  async execute({ id }: FindAccountByIdQuery): Promise<AccountDto> {
    // Finds an account by its ID using the AccountDtoRepository and returns the AccountDto.
    return this.accountDtoRepository.findById(id);
  }
}
