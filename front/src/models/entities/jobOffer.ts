/**
 * The status of a job offer.
 */
export enum JobOfferStatus {
  NOT_APPLIED = -1,
  APPLIED = 0,
  ACCEPTED = 1,
  REJECTED = 2,
}

/**
 * A job offer.
 */
export type JobOffer = {
  /**
   * The id of the job offer.
   */
  id: string;

  /**
   * The title of the job offer.
   */
  title: string;

  /**
   * The description of the job offer.
   */
  description: string;

  /**
   * The start date of the job offer.
   * Formatted as an ISO 8601 string.
   */
  startDate: string;

  /**
   * The end date of the job offer.
   * Formatted as an ISO 8601 string.
   */
  endDate: string;

  /**
   * The geographic area of the job offer.
   */
  geographicArea: string;

  /**
   * The status of the job offer.
   */
  status: JobOfferStatus;
};
