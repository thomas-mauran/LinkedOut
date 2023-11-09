import { CreateExperienceDto } from '@/models/dtos/experience/createExperienceDto';

/**
 * DTO for updating an experience.
 */
export type UpdateExperienceDto = Partial<CreateExperienceDto> & {
  /**
   * The id of the experience.
   */
  id: string;
};
