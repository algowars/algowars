import { Injectable } from '@nestjs/common';
import { AccountQuery } from 'src/account/application/queries/account-query';

@Injectable()
export class AccountQueryImplementation implements AccountQuery {}
