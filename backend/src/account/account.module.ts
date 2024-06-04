import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema } from './db/account.schema';
import { AccountEntityRepository } from './db/account-entity.repository';
import { AccountDtoRepository } from './db/account-dto.repository';
import { AccountSchemaFactory } from './db/account-schema.factory';
import { AccountFactory } from './account.factory';
import { AccountEventHandlers } from './events';
import { AccountQueryHandlers } from './queries';
import { AccountCommandHandlers } from './commands';
import { AccountDtoFactory } from './dto/account.dto.factory';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AccountSchema])],
  controllers: [AccountController],
  providers: [
    AccountEntityRepository,
    AccountDtoFactory,
    AccountDtoRepository,
    AccountSchemaFactory,
    AccountFactory,
    ...AccountCommandHandlers,
    ...AccountEventHandlers,
    ...AccountQueryHandlers,
  ],
})
export class AccountModule {}
