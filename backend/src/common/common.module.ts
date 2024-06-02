import { Module } from '@nestjs/common';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [],
  controllers: [],
  providers: [PaginationModule],
})
export class CommonModule {}
