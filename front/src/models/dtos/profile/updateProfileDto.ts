import { Address } from '@/models/entities/address';
import { Gender } from '@/models/entities/profile';

/**
 * DTO for updating a profile.
 */
export type UpdateProfileDto = Partial<{
  /**
   * The first name of the user.
   */
  firstName: string;

  /**
   * The last name of the user.
   */
  lastName: string;

  /**
   * The gender of the user.
   */
  gender: Gender;

  /**
   * The birthday of the user.
   * Formatted as an ISO 8601 date.
   */
  birthday: string;

  /**
   * The nationality of the user.
   * Formatted as an ISO 3166-1 alpha-3 country code.
   */
  nationality: string;

  /**
   * The address of the user.
   */
  address: Address;

  /**
   * The phone number of the user.
   */
  phone: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The short biography of the user.
   */
  shortBiography: string;
}>;
