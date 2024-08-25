import { Module } from '@nestjs/common'; // Import the Module decorator from NestJS
import { PaginationRequest } from './dto/request/pagination-request.dto'; // Import the PaginationRequest DTO

// Define a module for pagination functionality
@Module({
  providers: [PaginationRequest], // Register the PaginationRequest as a provider in this module
})
export class PaginationModule { } // Export the PaginationModule class
