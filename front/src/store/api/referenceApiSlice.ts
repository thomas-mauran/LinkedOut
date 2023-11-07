import { Reference } from '@/models/types';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for references.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferences: builder.query<Reference[], void>({
      query: () => 'profile/references/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'References' as const,
                id,
              })),
              { type: 'References', id: 'LIST' },
            ]
          : [{ type: 'References', id: 'LIST' }],
    }),
    getReference: builder.query<Reference, number>({
      query: (id) => `profile/references/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'References', id }],
    }),
    postReference: builder.mutation<Partial<Reference>, Partial<Reference>>({
      query: (body) => ({
        url: 'profile/references/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'References', id: 'LIST' }],
    }),
    patchReference: builder.mutation<Partial<Reference>, Partial<Reference>>({
      query: (body) => ({
        url: `profile/references/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'References', id: 'LIST' },
        { type: 'References', id },
      ],
    }),
    deleteReference: builder.mutation<Partial<Reference>, number>({
      query: (id) => ({
        url: `profile/references/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'References', id: 'LIST' },
        { type: 'References', id },
      ],
    }),
  }),
});

export const {
  useGetReferencesQuery,
  useGetReferenceQuery,
  usePostReferenceMutation,
  usePatchReferenceMutation,
  useDeleteReferenceMutation,
} = extendedApiSlice;
