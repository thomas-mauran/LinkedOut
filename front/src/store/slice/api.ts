import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  Availability,
  Evaluation,
  Experience,
  JobCategory,
  Profile,
  Reference,
} from '@/models/types';

const baseUrl = process.env.EXPO_PUBLIC_MOCK_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    // Availabilities
    getAvailabilities: builder.query<Partial<Availability>[], string>({
      query: () => 'profile/availabilities/',
    }),
    deleteAvailabilities: builder.mutation<Partial<Availability>, number>({
      query: (id) => ({
        url: `profile/availabilities/${id}/`,
        method: 'DELETE',
      }),
    }),
    postAvailabilities: builder.mutation<
      Partial<Availability>,
      Partial<Availability>
    >({
      query: (body) => ({
        url: 'profile/availabilities/',
        method: 'POST',
        body,
      }),
    }),
    patchAvailabilities: builder.mutation<
      Partial<Availability>,
      Partial<Availability>
    >({
      query: (body) => ({
        url: `profile/availabilities/${body.id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    // Experiences
    getExperiences: builder.query<Partial<Experience>[], string>({
      query: () => 'profile/experiences/',
    }),
    postExperience: builder.mutation<Partial<Experience>, Partial<Experience>>({
      query: (body) => ({
        url: 'profile/experiences/',
        method: 'POST',
        body,
      }),
    }),
    patchExperience: builder.mutation<Partial<Experience>, Partial<Experience>>(
      {
        query: (body) => ({
          url: `profile/experiences/${body.id}/`,
          method: 'PATCH',
          body,
        }),
      },
    ),
    deleteExperience: builder.mutation<Partial<Experience>, number>({
      query: (id) => ({
        url: `profile/experiences/${id}/`,
        method: 'DELETE',
      }),
    }),

    // References
    getReferences: builder.query<Partial<Reference>[], string>({
      query: () => 'profile/references/',
    }),
    postReference: builder.mutation<Partial<Reference>, Partial<Reference>>({
      query: (body) => ({
        url: 'profile/references/',
        method: 'POST',
        body,
      }),
    }),
    patchReference: builder.mutation<Partial<Reference>, Partial<Reference>>({
      query: (body) => ({
        url: `profile/references/${body.id}/`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteReference: builder.mutation<Partial<Reference>, number>({
      query: (id) => ({
        url: `profile/references/${id}/`,
        method: 'DELETE',
      }),
    }),

    // Evaluations
    getEvaluations: builder.query<Partial<Evaluation>[], string>({
      query: () => 'profile/evaluations/',
    }),

    // Profile
    getProfile: builder.query<Partial<Profile>, string>({
      query: () => 'profile/',
    }),
    patchProfile: builder.mutation<Partial<Profile>, Partial<Profile>>({
      query: (body) => ({
        url: 'profile/',
        method: 'PATCH',
        body,
      }),
    }),

    // JOBS

    // JobCategories
    getJobCategories: builder.query<Partial<JobCategory>[], string>({
      query: () => 'jobs/categories/',
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAvailabilitiesQuery,
  useGetExperiencesQuery,
  useGetReferencesQuery,
  usePostExperienceMutation,
  usePatchExperienceMutation,
  useDeleteExperienceMutation,
  usePostReferenceMutation,
  usePatchReferenceMutation,
  useDeleteReferenceMutation,
  useGetEvaluationsQuery,
  usePatchProfileMutation,
  usePostAvailabilitiesMutation,
  usePatchAvailabilitiesMutation,
  useDeleteAvailabilitiesMutation,
  useGetJobCategoriesQuery,
} = api;
