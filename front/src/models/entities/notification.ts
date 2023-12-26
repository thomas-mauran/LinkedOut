/**
 * Notification.
 */
export type Notification = {
  /**
   * The id of the notification.
   */
  id: string;

  /**
   * The title of the notification.
   */
  title: string;

  /**
   * The content of the notification.
   */
  content: string;

  /**
   * The date of the notification.
   * Formatted as an ISO 8601 string.
   */
  sentAt: string;
};
