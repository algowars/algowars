import { Controller } from '@nestjs/common';
import { RushService } from './rush.service';

@Controller('rush')
export class RushController {
  constructor(private readonly rushService: RushService) {}
}
