import { Module } from '@nestjs/common';
import { ProblemSetupService } from './problem-setup.service';
import { ProblemSetupController } from './problem-setup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemSetup } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemSetup])],
  controllers: [ProblemSetupController],
  providers: [ProblemSetupService],
})
export class ProblemSetupModule {}
