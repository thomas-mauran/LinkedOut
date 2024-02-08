import { JobOffer } from '@/models/entities/jobOffer';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for job offers.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobOffers: builder.query<JobOffer[], void>({
      query: () => 'jobOffers',
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
      query: (id) => `jobOffers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'JobOffer', id }],
    }),
    getAppliedJobOffers: builder.query<JobOffer[], void>({
      query: () => {
        return 'jobOffers?onlyApplied=true';
      },
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
    postApplyJobOffer: builder.mutation<JobOffer, string>({
      query: (id) => ({
        url: `jobOffers/${id}/apply`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'JobOffer', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetJobOffersQuery,
  useGetJobOfferQuery,
  usePostApplyJobOfferMutation,
  useGetAppliedJobOffersQuery,
} = extendedApiSlice;
