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
   */
  startDate: string;

  /**
   * The end date of the job offer.
   */
  endDate: string;

  /**
   * The geographic area of the job offer.
   */
  geographicArea: string;

  /**
   * The geographic area of the job offer.
   */
  status: string;
};
