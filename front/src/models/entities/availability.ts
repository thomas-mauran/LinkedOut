import { Address } from '@/models/entities/address';
import { JobCategory } from '@/models/entities/jobCategory';

/**
 * Availability of a user.
 */
export type Availability = {
  /**
   * The id of the availability.
   */
  id: string;

  /**
   * The start date of the availability.
   * Formatted as an ISO 8601 string.
   */
  startDate: string;

  /**
   * The end date of the availability.
   * Formatted as an ISO 8601 string.
   */
  endDate: string;

  /**
   * The address of the availability.
   */
  address: Address;

  /**
   * The job category of the availability.
   */
  jobCategory: JobCategory;

  /**
   * The range around the address (in kilometers).
   */
  range: number;
};
