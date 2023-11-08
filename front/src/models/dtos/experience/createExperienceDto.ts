import { Address } from '@/models/entities/address';
import { Company } from '@/models/entities/company';

/**
 * DTO for creating a new experience.
 */
export type CreateExperienceDto = {
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
   * The company where the experience was made.
   */
  company: Omit<Company, 'id'>;

  /**
   * The job id of the experience.
   */
  jobId: string;
};
