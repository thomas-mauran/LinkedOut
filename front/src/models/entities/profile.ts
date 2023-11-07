import { Address } from '@/models/entities/address';

/**
 * Known genders.
 */
enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
  UNSPECIFIED = 9,
}

/**
 * The profile of a user.
 */
export type Profile = {
  /**
   * The id of the profile.
   */
  id: number;

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

  /**
   * Whether the user requested their profile to be deleted.
   */
  deletionRequested: boolean;

  /**
   * The number of experiences of the user.
   */
  nbExperiences: number;

  /**
   * The number of reviews of the user.
   */
  nbReviews: number;

  /**
   * The average rating of the user.
   */
  averageRating: number;
};
