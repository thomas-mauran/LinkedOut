import { CreateExperienceDto } from '@/models/dtos/experience/createExperienceDto';
import { UpdateExperienceDto } from '@/models/dtos/experience/updateExperienceDto';
import { Experience } from '@/models/entities/experience';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for experiences.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<Experience[], void>({
      query: () => 'profile/experiences',
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
    getExperience: builder.query<Experience, string>({
      query: (id) => `profile/experiences/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Experiences', id }],
    }),
    postExperience: builder.mutation<Experience, CreateExperienceDto>({
      query: (body) => ({
        url: 'profile/experiences',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
    }),
    patchExperience: builder.mutation<Experience, UpdateExperienceDto>({
      query: (body) => ({
        url: `profile/experiences/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Experiences', id: 'LIST' },
        { type: 'Experiences', id },
      ],
    }),
    deleteExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `profile/experiences/${id}`,
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
