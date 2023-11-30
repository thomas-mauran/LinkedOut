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

  employer: {
    /**
     * The first name of the employer.
     */
    firstName: string;

    /**
     * The last name of the employer.
     */
    lastName: string;

    /**
     * The profile picture of the employer.
     */
    picture: string;

    /**
     * The mobile phone of the employer.
     */
    phone: string;
  };

  /**
   * The last message of the message channel.
   */
  lastMessage: string;
};
