import { Account } from 'src/account/domain/account';
import { ProblemStatus } from './problem-status';
import {
  BaseDomainAggregateRoot,
  BaseDomainAggregateRootImplementation,
  BaseDomainProperties,
} from 'src/common/entities/base-domain';
import { Tag } from './tag';

export interface ProblemProperties extends BaseDomainProperties {
  title: string;
  slug: string;
  question?: string;
  status?: ProblemStatus;
  createdBy?: Account;
  tags?: Tag[];
}

export interface Problem extends BaseDomainAggregateRoot {
  getTitle(): string;
  getQuestion(): string;
  getSlug(): string;
  getCreatedBy(): Account;
  getStatus(): ProblemStatus;
  getTags(): Tag[];
}

export class ProblemImplementation
  extends BaseDomainAggregateRootImplementation
  implements Problem
{
  private readonly title: string;
  private readonly question: string;
  private readonly slug: string;
  private readonly createdBy?: Account;
  private readonly status: ProblemStatus;
  private readonly tags: Tag[];

  constructor(properties: ProblemProperties) {
    super(properties);
    Object.assign(this, properties);
  }

  getTitle(): string {
    return this.title;
  }

  getQuestion(): string {
    return this.question;
  }

  getSlug(): string {
    return this.slug;
  }

  getCreatedBy(): Account | null {
    return this.createdBy ?? null;
  }

  getStatus(): ProblemStatus {
    return this.status;
  }

  getTags(): Tag[] {
    return this.tags;
  }
}
