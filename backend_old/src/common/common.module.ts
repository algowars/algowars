import { Module } from '@nestjs/common';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [PaginationModule]
})
export class CommonModule {}
