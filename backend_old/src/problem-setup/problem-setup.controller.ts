import { Controller } from '@nestjs/common';
import { ProblemSetupService } from './problem-setup.service';

@Controller('v1/problem-setup')
export class ProblemSetupController {
  constructor(private readonly problemSetupService: ProblemSetupService) {}
}
