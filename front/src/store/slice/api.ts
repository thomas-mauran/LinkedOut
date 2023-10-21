import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { Profile } from './types';

const baseUrl = 'http://10.0.2.2:3000';

console.log('baseUrl', baseUrl);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<Profile[], string>({
      query: () => 'profiles/',
    }),
    getProfile: builder.query<Profile, string>({
      query: (id) => `profiles/${id}`,
    }),
  }),
});

export const { useGetProfilesQuery, useGetProfileQuery } = api;
