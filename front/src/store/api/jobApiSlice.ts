import { Job } from '@/models/entities/job';
import { JobCategory } from '@/models/entities/jobCategory';
import { JobOffer } from '@/models/entities/jobOffer';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for jobs and job categories.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobOffers: builder.query<JobOffer[], void>({
      query: () => 'jobOffers/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'JobOffer' as const,
                id,
              })),
              { type: 'JobOffer', id: 'LIST' },
            ]
          : [{ type: 'JobOffer', id: 'LIST' }],
    }),
    getJobOffer: builder.query<JobOffer, string>({
      query: (id) => `jobOffers/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'JobOffer', id }],
    }),
    postApplyJobOffer: builder.mutation<JobOffer, string>({
      query: (id) => ({
        url: `jobOffers/${id}/apply`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'JobOffer', id: 'LIST' }],
    }),
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

export const {
  useGetJobOffersQuery,
  useGetJobCategoriesQuery,
  useGetJobsQuery,
  useGetJobOfferQuery,
  usePostApplyJobOfferMutation,
} = extendedApiSlice;
