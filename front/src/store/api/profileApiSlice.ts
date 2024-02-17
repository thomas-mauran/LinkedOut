import { CreateProfileDto } from '@/models/dtos/profile/createProfileDto';
import { UpdateProfileDto } from '@/models/dtos/profile/updateProfileDto';
import { Profile } from '@/models/entities/profile';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for the profile.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => 'profile',
      providesTags: ['Profile'],
    }),
    patchProfile: builder.mutation<Profile, UpdateProfileDto>({
      query: (body) => ({
        url: 'profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    putProfile: builder.mutation<Profile, CreateProfileDto>({
      query: (body) => ({
        url: 'profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    uploadProfilePicture: builder.mutation<void, string>({
      query: (uri) => {
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: 'profile-picture.png',
          type: 'image/png',
        });

        return {
          url: 'profile/photo',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['ProfilePicture'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  usePatchProfileMutation,
  usePutProfileMutation,
  useUploadProfilePictureMutation,
} = extendedApiSlice;
