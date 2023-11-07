import { Address } from '@/models/entities/address';
import { Company } from '@/models/entities/company';
import { Job } from '@/models/entities/job';

/**
 * Experience of a user.
 */
export type Experience = {
  /**
   * The id of the experience.
   */
  id: number;

  /**
   * The start date of the experience.
   * Formatted as an ISO 8601 string.
   */
  startDate: string;

  /**
   * The end date of the experience.
   * Formatted as an ISO 8601 string.
   */
  endDate: string;

  /**
   * The address of the experience.
   */
  address: Address;

  /**
   * The company where the experience took place.
   */
  company: Partial<Company>;

  /**
   * The job done during the experience.
   */
  job: Partial<Job>;
};
