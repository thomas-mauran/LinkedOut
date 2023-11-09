import { Job } from '@/models/entities/job';
import { JobCategory } from '@/models/entities/jobCategory';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for jobs and job categories.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobCategories: builder.query<JobCategory[], void>({
      query: () => 'jobs/categories/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'JobCategories' as const,
                id,
              })),
              { type: 'JobCategories', id: 'LIST' },
            ]
          : [{ type: 'JobCategories', id: 'LIST' }],
    }),
    getJobs: builder.query<Job[], void>({
      query: () => 'jobs/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Job' as const,
                id,
              })),
              { type: 'Job', id: 'LIST' },
            ]
          : [{ type: 'Job', id: 'LIST' }],
    }),
  }),
});

export const { useGetJobCategoriesQuery, useGetJobsQuery } = extendedApiSlice;
