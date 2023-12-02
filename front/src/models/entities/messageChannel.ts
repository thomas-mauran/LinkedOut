import { Employer } from './employer';

/**
 * Message channel.
 */
export type MessageChannel = {
  /**
   * The id of the message channel.
   */
  id: string;

  /**
   * Employer object.
   */
  employer: Employer;

  /**
   * The last message of the message channel.
   */
  lastMessage: string;
};
