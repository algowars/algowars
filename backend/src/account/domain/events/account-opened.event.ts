import { IEvent } from '@nestjs/cqrs';
import { Id } from 'src/common/domain/id';

export class AccountOpenedEvent implements IEvent {
  constructor(readonly accountId: Id) {}
}
