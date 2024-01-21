import { Evaluation } from '@/models/entities/evaluation';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for evaluations.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvaluations: builder.query<Evaluation[], void>({
      query: () => 'profile/evaluations',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Evaluations' as const,
                id,
              })),
              { type: 'Evaluations', id: 'LIST' },
            ]
          : [{ type: 'Evaluations', id: 'LIST' }],
    }),
  }),
});

export const { useGetEvaluationsQuery } = extendedApiSlice;
