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
    getProfilePicture: builder.query<string, void>({
      query: () => ({
        url: 'profile/photo',
        responseHandler: async (response) => {
          const blob = await response.blob();

          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        },
      }),
      providesTags: ['ProfilePicture'],
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
    uploadResume: builder.mutation<void, string>({
      query: (uri) => {
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: 'cv.pdf',
          type: 'application/pdf',
        });

        return {
          url: 'profile/cv',
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['ProfileResume'],
    }),
    requestDeletion: builder.mutation<void, void>({
      query: () => ({
        url: 'profile/requestDeletion',
        method: 'POST',
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfilesRequestingDeletion: builder.query<Profile[], void>({
      query: () => 'profile/requestDeletion',
      providesTags: ['ProfilesRequestingDeletion'],
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: `profile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProfilesRequestingDeletion'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  usePatchProfileMutation,
  usePutProfileMutation,
  useGetProfilePictureQuery,
  useUploadProfilePictureMutation,
  useUploadResumeMutation,
  useRequestDeletionMutation,
  useGetProfilesRequestingDeletionQuery,
  useDeleteProfileMutation,
} = extendedApiSlice;
