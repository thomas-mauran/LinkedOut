import { Address } from '@/models/entities/address';
import { Company } from '@/models/entities/company';

/**
 * DTO for creating a new reference.
 */
export type CreateReferenceDto = {
  /**
   * The first name of the referer.
   */
  firstName: string;

  /**
   * The last name of the referer.
   */
  lastName: string;

  /**
   * The address of the referer.
   */
  address: Address;

  /**
   * The email address of the referer.
   */
  email: string;

  /**
   * The phone number of the referer.
   */
  phone: string;

  /**
   * The company where the referer works.
   */
  company: Omit<Company, 'id'>;
};
