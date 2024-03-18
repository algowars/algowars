import { Module } from '@nestjs/common';
import { TestInputService } from './test-input.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestInput } from 'src/data-model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TestInput])],
  providers: [TestInputService],
})
export class TestInputModule {}
