import { Notification } from '@/models/entities/notification';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for notifications.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => 'notifications/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Notification' as const,
                id,
              })),
              { type: 'Notification', id: 'LIST' },
            ]
          : [{ type: 'Notification', id: 'LIST' }],
    }),
  }),
});

export const { useGetNotificationsQuery } = extendedApiSlice;
