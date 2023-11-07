import { Experience } from '@/models/types';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for experiences.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<Experience[], void>({
      query: () => 'profile/experiences/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Experiences' as const,
                id,
              })),
              { type: 'Experiences', id: 'LIST' },
            ]
          : [{ type: 'Experiences', id: 'LIST' }],
    }),
    getExperience: builder.query<Experience, number>({
      query: (id) => `profile/experiences/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Experiences', id }],
    }),
    postExperience: builder.mutation<Partial<Experience>, Partial<Experience>>({
      query: (body) => ({
        url: 'profile/experiences/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
    }),
    patchExperience: builder.mutation<Partial<Experience>, Partial<Experience>>(
      {
        query: (body) => ({
          url: `profile/experiences/${body.id}/`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: (_result, _error, { id }) => [
          { type: 'Experiences', id: 'LIST' },
          { type: 'Experiences', id },
        ],
      },
    ),
    deleteExperience: builder.mutation<Partial<Experience>, number>({
      query: (id) => ({
        url: `profile/experiences/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Experiences', id: 'LIST' },
        { type: 'Experiences', id },
      ],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceQuery,
  usePostExperienceMutation,
  usePatchExperienceMutation,
  useDeleteExperienceMutation,
} = extendedApiSlice;
