import { Module } from '@nestjs/common'; // Import the Module decorator from NestJS
import { PaginationModule } from './pagination/pagination.module'; // Import the PaginationModule

// Define a common module that groups together shared functionality
@Module({
  imports: [], // Specify any modules to import; currently empty
  controllers: [], // Specify any controllers for this module; currently empty
  providers: [PaginationModule], // Register the PaginationModule as a provider in this module
})
export class CommonModule { } // Export the CommonModule class
