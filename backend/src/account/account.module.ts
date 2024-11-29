import { Logger, Module, Provider } from '@nestjs/common';
import { AccountController } from './interface/account.controller';
import { InjectionToken } from './application/injection-token';
import { AccountQueryImplementation } from './infrastructure/queries/account-query-implementation';
import { AccountQueryHandlers } from './application/queries';
import { AccountFactory } from './domain/account-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountRepositoryImplementation } from './infrastructure/repositories/account-repository-implementation';
import { AccountCommandHandlers } from './application/commands';

export const infrastructure: Provider[] = [
  {
    provide: InjectionToken.ACCOUNT_QUERY,
    useClass: AccountQueryImplementation,
  },
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImplementation,
  },
];

export const application = [...AccountQueryHandlers, ...AccountCommandHandlers];

export const domain = [AccountFactory];

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [...infrastructure, ...domain],
})
export class AccountModule {}
