/**
 * Evaluation of a user by an employer.
 */
export type Evaluation = {
  /**
   * The id of the evaluation.
   */
  id: string;

  /**
   * The first name of the employer.
   */
  employerFirstName: string;

  /**
   * The last name of the employer.
   */
  employerLastName: string;

  /**
   * The score of the evaluation.
   */
  score: number;

  /**
   * The review of the evaluation.
   */
  review: string;

  /**
   * The date of the evaluation.
   * Formatted as an ISO 8601 date.
   */
  createdAt: string;
};
