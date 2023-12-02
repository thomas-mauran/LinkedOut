import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

/**
 * The API slice.
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
  tagTypes: [
    'Availabilities',
    'Evaluations',
    'Experiences',
    'JobCategories',
    'Profile',
    'References',
    'Job',
    'JobOffer',
    'MessageChannel',
  ],
});
