import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationDto } from './create-evaluation.entity';

export class UpdateEvaluatorDto extends PartialType(CreateEvaluationDto) {}
