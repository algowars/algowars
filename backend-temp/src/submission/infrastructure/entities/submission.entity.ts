import { CodeExecutionEngines } from 'lib/code-execution/code-execution-engines';
import { BaseEntity } from 'src/common/entities/base-entity';

export interface SubmissionEntity extends BaseEntity {
  id: string;
  source_code: string;
  language_id: number;
  created_by_id: string;
  code_execution_context: CodeExecutionEngines;
  problem_id: string;
}
