import { Controller } from '@nestjs/common';
import { ProblemSetupService } from './problem-setup.service';

@Controller('problem-setup')
export class ProblemSetupController {
  constructor(private readonly problemSetupService: ProblemSetupService) {}
}
