import { Id } from 'src/common/domain/id';
import {
  BaseDomain,
  BaseDomainImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';

export type ProblemStatusEssentialProperties = Readonly<
  Required<{
    id: Id;
    description: string;
  }>
>;

export type ProblemStatusProperties = ProblemStatusEssentialProperties &
  BaseDomainProperties;

export interface ProblemStatus extends BaseDomain {
  getDescription(): string;
}

export class ProblemStatusImplementation
  extends BaseDomainImplementation
  implements ProblemStatus
{
  private readonly description: string;

  constructor(properties: ProblemStatusProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getDescription(): string {
    return this.description;
  }
}
