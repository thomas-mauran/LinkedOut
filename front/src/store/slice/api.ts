import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  Availability,
  Evaluation,
  Experience,
  Profile,
  References,
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
    getReferences: builder.query<References[], string>({
      query: () => 'profile/references/',
    }),
    getEvaluation: builder.query<Evaluation[], string>({
      query: () => 'profile/evaluation/',
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
} = api;
