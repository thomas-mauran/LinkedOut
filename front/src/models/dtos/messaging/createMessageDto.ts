/**
 * DTO for creating a new message in a message channel.
 */
export type CreateMessageDto = {
  /**
   * The channel id.
   */
  id: string;

  /**
   * The content of the message.
   */
  content: string;
};
