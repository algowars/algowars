import { Logger, Module, Provider } from '@nestjs/common';
import { AccountInjectionToken } from './application/injection-token';
import { AccountQueryImplementation } from './infrastructure/queries/account-query-implementation';
import { AccountRepositoryImplementation } from './infrastructure/repositories/account-repository-implementation';
import { AccountQueryHandlers } from './application/queries';
import { AccountCommandHandlers } from './application/commands';
import { AccountFactory } from './domain/account-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountController } from './interface/account.controller';

const infrastructure: Provider[] = [
  {
    provide: AccountInjectionToken.ACCOUNT_QUERY,
    useClass: AccountQueryImplementation,
  },
  {
    provide: AccountInjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImplementation,
  },
];

const application = [...AccountQueryHandlers, ...AccountCommandHandlers];

const domain = [AccountFactory];

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class AccountModule {}
