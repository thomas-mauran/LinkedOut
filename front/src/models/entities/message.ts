/**
 * The direction of a message.
 */
export enum MessageDirection {
  WorkerToEmployer = 0,
  EmployerToWorker = 1,
}

/**
 * Message channel.
 */
export type Message = {
  /**
   * The id of the message.
   */
  id: string;

  /**
   * The id of the message channel the message was sent in.
   */
  channelId: string;

  /**
   * The id of the employer.
   */
  employerId: string;

  /**
   * The direction of the message.
   */
  direction: MessageDirection;

  /**
   * The timestamp of the message.
   */
  sentAt: string;

  /**
   * The content of the message.
   */
  content: string;
};
