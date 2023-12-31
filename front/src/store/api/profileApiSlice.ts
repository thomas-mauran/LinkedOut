import { UpdateProfileDto } from '@/models/dtos/profile/updateProfileDto';
import { Profile } from '@/models/entities/profile';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for the profile.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => 'profile/',
      providesTags: ['Profile'],
    }),
    patchProfile: builder.mutation<Profile, UpdateProfileDto>({
      query: (body) => ({
        url: 'profile/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, usePatchProfileMutation } = extendedApiSlice;
