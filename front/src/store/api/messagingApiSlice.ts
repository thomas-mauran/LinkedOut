import { MessageChannel } from '@/models/entities/messageChannel';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for message channels.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessageChannels: builder.query<MessageChannel[], void>({
      query: () => 'messaging/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'MessageChannel' as const,
                id,
              })),
              { type: 'MessageChannel', id: 'LIST' },
            ]
          : [{ type: 'MessageChannel', id: 'LIST' }],
    }),
  }),
});

export const { useGetMessageChannelsQuery } = extendedApiSlice;
