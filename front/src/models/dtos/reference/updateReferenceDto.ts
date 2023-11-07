import { CreateReferenceDto } from '@/models/dtos/reference/createReferenceDto';

/**
 * DTO for updating a reference.
 */
export type UpdateReferenceDto = Partial<CreateReferenceDto> & {
  /**
   * The id of the reference.
   */
  id: number;
};
