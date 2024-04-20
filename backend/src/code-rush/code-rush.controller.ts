import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CodeRushService } from './code-rush.service';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { AccountOwnerGuard } from 'src/auth/account-owner.guard';
import { Request } from 'express';
import { Problem, Rush } from 'src/data-model/entities';
import { AccountNotFoundException } from 'src/account/exceptions/account-not-found.exception';
import { PlayerNotFoundException } from 'src/player/exceptions/player-not-found.exception';

@Controller('v1/rush')
export class CodeRushController {
  constructor(private readonly codeRushService: CodeRushService) {}

  @UseGuards(AuthorizationGuard, AccountOwnerGuard)
  @Post()
  createRush(@Req() request: Request): Promise<Rush> {
    this.validatePrivateAccount(request);
    const account = this.mapPrivateAccount(request);

    return this.codeRushService.createRush();
  }

  private createProblemSet(): Promise<Problem[]> {}

  private validatePrivateAccount(request: Request): void {
    if (!request.account) {
      throw new AccountNotFoundException();
    }
    const account = request.account;

    if (!account.player) {
      throw new PlayerNotFoundException();
    }
  }

  private mapPrivateAccount(request: Request): Account {
    return request.account;
  }
}
