import { Address } from '@/models/entities/address';

/**
 * DTO for creating a new availability.
 */
export type CreateAvailabilityDto = {
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
   * The id of the job category of the availability.
   */
  jobCategoryId: string;

  /**
   * The range around the address (in kilometers).
   */
  range: number;
};
