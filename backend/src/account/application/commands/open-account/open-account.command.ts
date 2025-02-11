import { ICommand } from '@nestjs/cqrs';

export class OpenAccountCommand implements ICommand {
  constructor(
    readonly sub: string,
    readonly username: string,
    readonly picture?: string,
  ) {}
}
