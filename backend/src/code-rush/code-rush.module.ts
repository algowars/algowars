import { Module } from '@nestjs/common';
import { CodeRushService } from './code-rush.service';
import { CodeRushController } from './code-rush.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Rush } from 'src/data-model/entities';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Rush])],
  controllers: [CodeRushController],
  providers: [CodeRushService, AccountService],
})
export class CodeRushModule {}
