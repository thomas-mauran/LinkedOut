import { CreateAvailabilityDto } from '@/models/dtos/availability/createAvailabilityDto';

/**
 * DTO for updating an availability.
 */
export type UpdateAvailabilityDto = Partial<CreateAvailabilityDto> & {
  /**
   * The id of the availability.
   */
  id: string;
};
