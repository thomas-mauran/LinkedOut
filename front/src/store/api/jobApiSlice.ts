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
  }),
});

export const { useGetJobCategoriesQuery } = extendedApiSlice;
