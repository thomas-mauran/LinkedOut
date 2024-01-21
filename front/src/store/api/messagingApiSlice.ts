import { CreateMessageDto } from '@/models/dtos/messaging/createMessageDto';
import { Message } from '@/models/entities/message';
import { MessageChannel } from '@/models/entities/messageChannel';
import { apiSlice } from '@/store/api/apiSlice';

/**
 * The extended API slice for message channels.
 */
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessageChannels: builder.query<MessageChannel[], void>({
      query: () => 'messaging',
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
    getMessageChannel: builder.query<MessageChannel, string>({
      query: (id) => `messaging/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'MessageChannel', id }],
    }),
    getMessages: builder.query<Message[], string>({
      query: (id) => `messaging/${id}/messages`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Message' as const,
                id,
              })),
              { type: 'Message', id: 'LIST' },
            ]
          : [{ type: 'Message', id: 'LIST' }],
    }),
    postMessage: builder.mutation<Message, CreateMessageDto>({
      query: (body) => ({
        url: `messaging/${body.id}/messages`,
        method: 'POST',
        body: { content: body.content },
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMessageChannelsQuery,
  useGetMessagesQuery,
  usePostMessageMutation,
  useGetMessageChannelQuery,
} = extendedApiSlice;
