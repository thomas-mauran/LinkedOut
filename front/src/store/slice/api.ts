import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  Availability,
  Evaluation,
  Experience,
  Profile,
  References,
} from './types';

const baseUrl = 'http://10.0.2.2:3000';

console.log('baseUrl', baseUrl);

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
} = api;
