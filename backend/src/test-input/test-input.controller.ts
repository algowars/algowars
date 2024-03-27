import { Controller } from '@nestjs/common';
import { TestInputService } from './test-input.service';

@Controller('v1/test-input')
export class TestInputController {
  constructor(private readonly testInputService: TestInputService) {}
}
