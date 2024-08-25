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
  imports: [
    CqrsModule, // Importing CQRS module to handle command and query responsibilities.
    TypeOrmModule.forFeature([AccountSchema]) // Importing TypeOrmModule with AccountSchema to enable TypeORM functionalities for AccountSchema.
  ],
  controllers: [AccountController], // Registering AccountController to handle HTTP requests.
  providers: [
    AccountEntityRepository, // Provider for AccountEntityRepository to handle entity persistence.
    AccountDtoFactory, // Provider for AccountDtoFactory to create AccountDto from schema.
    AccountDtoRepository, // Provider for AccountDtoRepository to handle DTO-related database operations.
    AccountSchemaFactory, // Provider for AccountSchemaFactory to create AccountSchema from entities.
    AccountFactory, // Provider for AccountFactory to create new Account entities.
    ...AccountCommandHandlers, // Spreading AccountCommandHandlers array to register command handlers.
    ...AccountEventHandlers, // Spreading AccountEventHandlers array to register event handlers.
    ...AccountQueryHandlers, // Spreading AccountQueryHandlers array to register query handlers.
  ],
})
// AccountModule is the main module that bundles all account-related components together.
export class AccountModule { }
