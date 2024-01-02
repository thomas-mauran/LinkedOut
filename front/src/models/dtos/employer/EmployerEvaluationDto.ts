import { EmployerEvaluation } from '@/models/entities/employerEvaluation';

/**
 * DTO for creating a new employer evaluation.
 */
export type EmployerEvaluationDto = {
  /**
   * The id of the employer.
   */
  id: string;

  /**
   * The employer evaluation.
   */
  evaluation: EmployerEvaluation;
};
