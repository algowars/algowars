import { Injectable } from '@nestjs/common';
import { readConnection } from 'lib/database.module';
import { AccountQuery } from 'src/problem/application/queries/problem-query';
import { AccountEntity } from '../entities/problem.entity';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {
}
