import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from 'src/data-model/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerTimes } from 'src/common/throttler/throttler-times';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem]),
    ThrottlerModule.forRoot([
      {
        ttl: ThrottlerTimes.TEN_SECONDS,
        limit: 5,
      },
    ]),
  ],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}
