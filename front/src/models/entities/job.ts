import { JobCategory } from '@/models/entities/jobCategory';

/**
 * A job.
 */
export type Job = {
  /**
   * The id of the job.
   */
  id: number;

  /**
   * The title of the job.
   */
  title: string;

  /**
   * The category of the job.
   */
  category: JobCategory;
};
