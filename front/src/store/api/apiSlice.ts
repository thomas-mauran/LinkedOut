import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/store/store';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

/**
 * The API slice.
 */
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      if (state.auth.state === 'authenticated') {
        headers.set('Authorization', `Bearer ${state.auth.token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'Availabilities',
    'Employer',
    'EmployerEvaluation',
    'Evaluations',
    'Experiences',
    'JobCategories',
    'Profile',
    'ProfilePicture',
    'ProfileResume',
    'References',
    'Job',
    'JobOffer',
    'MessageChannel',
    'Message',
    'Notification',
  ],
});
