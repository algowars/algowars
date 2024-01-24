import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluatorService {
  evaluateAnonymous(code: string);
}
