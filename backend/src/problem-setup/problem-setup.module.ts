import { Module } from '@nestjs/common';
import { ProblemSetupService } from './problem-setup.service';
import { ProblemSetupController } from './problem-setup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemInitialInputs, ProblemSetup } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemSetup, ProblemInitialInputs])],
  controllers: [ProblemSetupController],
  providers: [ProblemSetupService],
})
export class ProblemSetupModule {}
