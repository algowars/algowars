import { Controller} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('v1/account')
export class AccountController {
  constructor(private readonly queryBus: QueryBus) {}
}
