import { Injectable } from '@nestjs/common';
import { Account } from 'src/account/domain/account';
import { Id, IdImplementation } from 'src/common/domain/id';
import { LobbyImplementation } from './lobby';

export interface CreateLobbyOptions {
  id: string | Id;
  maxPlayers: number;
  players?: Account[];
}

@Injectable()
export class LobbyFactory {
  create(options: CreateLobbyOptions) {
    const id = this.createId(options.id);

    return new LobbyImplementation({
      ...options,
      id,
    });
  }

  private createId(id: string | Id): Id {
    if (typeof id === 'string') {
      return new IdImplementation(id);
    }

    return id;
  }
}
