import { Controller } from '@nestjs/common';
import { CodeRushService } from './code-rush.service';

@Controller('code-rush')
export class CodeRushController {
  constructor(private readonly codeRushService: CodeRushService) {}
}
