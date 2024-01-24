import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluatorDto } from './create-evaluator.dto';

export class UpdateEvaluatorDto extends PartialType(CreateEvaluatorDto) {}
