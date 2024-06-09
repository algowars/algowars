import { Controller, Post } from '@nestjs/common';

@Controller('v1/evaluation')
export class EvaluationController {
  constructor() {}

  @Post('anonymous')
  async evaluateAnonymous(): Promise<void> {}

  @Post()
  async evaluate(): Promise<void> {}
}
