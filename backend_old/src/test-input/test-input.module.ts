import { Module } from '@nestjs/common';
import { TestInputService } from './test-input.service';
import { TestInputController } from './test-input.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestInput } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TestInput])],
  controllers: [TestInputController],
  providers: [TestInputService],
})
export class TestInputModule {}
