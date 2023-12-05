/**
 * DTO for creating a new message in a message channel.
 */
export type CreateMessage = {
  /**
   * The channel id.
   */
  id: string;

  /**
   * The content of the message.
   */
  content: string;
};
