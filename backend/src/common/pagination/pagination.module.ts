import { Module } from '@nestjs/common';
import { PaginationRequest } from './dto/request/pagination-request.dto';

@Module({
  providers: [PaginationRequest],
})
export class PaginationModule {}
