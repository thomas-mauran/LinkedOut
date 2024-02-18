/**
 * DTO for creating a new message to an employer.
 */
export type CreateEmployerMessageDto = {
  /**
   * The employer id.
   */
  employerId: string;

  /**
   * The content of the message.
   */
  content: string;
};
