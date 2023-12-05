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
   * 0 (Seasonal worker ⇒ Employer)
   * 1 (Employer ⇒ Seasonal worker)
   */
  direction: number;

  /**
   * The timestamp of the message.
   */
  sentAt: string;

  /**
   * The content of the message.
   */
  content: string;
};
