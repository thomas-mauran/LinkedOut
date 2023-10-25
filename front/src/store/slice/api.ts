import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  Availability,
  Evaluation,
  Experience,
  Profile,
  Reference,
} from './types';

const baseUrl = process.env.EXPO_PUBLIC_MOCK_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, string>({
      query: () => 'profile/',
    }),
    getAvailabilities: builder.query<Availability[], string>({
      query: () => 'profile/availabilities/',
    }),
    getExperiences: builder.query<Experience[], string>({
      query: () => 'profile/experiences/',
    }),
    postExperience: builder.mutation<Experience, Experience>({
      query: (body) => ({
        url: 'profile/experiences/',
        method: 'POST',
        body,
      }),
    }),
    patchExperience: builder.mutation<Experience, Experience>({
      query: (body) => ({
        url: `profile/experiences/${body.id}/`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteExperience: builder.mutation<Experience, number>({
      query: (id) => ({
        url: `profile/experiences/${id}/`,
        method: 'DELETE',
      }),
    }),
    getReferences: builder.query<Reference[], string>({
      query: () => 'profile/references/',
    }),
    postReference: builder.mutation<Reference, Reference>({
      query: (body) => ({
        url: 'profile/references/',
        method: 'POST',
        body,
      }),
    }),
    patchReference: builder.mutation<Reference, Reference>({
      query: (body) => ({
        url: `profile/references/${body.id}/`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteReference: builder.mutation<Reference, number>({
      query: (id) => ({
        url: `profile/references/${id}/`,
        method: 'DELETE',
      }),
    }),
    getEvaluations: builder.query<Evaluation[], string>({
      query: () => 'profile/evaluations/',
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
} = api;
