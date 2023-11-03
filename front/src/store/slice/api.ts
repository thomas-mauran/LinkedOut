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

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    // Availabilities
    getAvailabilities: builder.query<Availability[], void>({
      query: () => 'profile/availabilities/',
    }),
    getAvailability: builder.query<Availability, number>({
      query: (id) => `profile/availabilities/${id}/`,
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
    getExperiences: builder.query<Experience[], void>({
      query: () => 'profile/experiences/',
    }),
    getExperience: builder.query<Experience, number>({
      query: (id) => `profile/experiences/${id}/`,
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
    getReferences: builder.query<Reference[], void>({
      query: () => 'profile/references/',
    }),
    getReference: builder.query<Reference, number>({
      query: (id) => `profile/references/${id}/`,
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
    getEvaluations: builder.query<Evaluation[], void>({
      query: () => 'profile/evaluations/',
    }),

    // Profile
    getProfile: builder.query<Profile, void>({
      query: () => 'profile/',
    }),
    patchProfile: builder.mutation<Partial<Profile>, Partial<Profile>>({
      query: (body) => ({
        url: 'profile/',
        method: 'PATCH',
        body,
      }),
    }),

    // Job categories
    getJobCategories: builder.query<JobCategory[], void>({
      query: () => 'jobs/categories/',
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAvailabilitiesQuery,
  useGetAvailabilityQuery,
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useGetReferencesQuery,
  useGetReferenceQuery,
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
