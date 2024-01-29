import { CreateProfileDto } from '@/models/dtos/profile/createProfileDto';

/**
 * DTO for updating a profile.
 */
export type UpdateProfileDto = Partial<CreateProfileDto>;
