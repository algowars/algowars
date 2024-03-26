import { Module } from '@nestjs/common';
import { ProblemSetupService } from './problem-setup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemSetup } from 'src/data-model/entities/problem-setup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemSetup])],
  providers: [ProblemSetupService],
})
export class ProblemSetupModule {}
