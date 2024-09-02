import { Module } from '@nestjs/common';
import { DocsController } from './infrastructure/docs.controller';

@Module({
  controllers: [DocsController],
})
export class DocsModule {}
