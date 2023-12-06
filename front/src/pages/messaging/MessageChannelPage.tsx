import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import MessageChannelContent from '@/components/messaging/MessageChannelContent';
import {
  useGetMessageChannelQuery,
  useGetMessagesQuery,
} from '@/store/api/messagingApiSlice';

import { MessagingStackParamList } from './MessagingNav';

/**
 * The styles for the MessageChannelPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the MessageChannelPage component.
 */
type MessageChannelPageProps = NativeStackScreenProps<
  MessagingStackParamList,
  'MessageChannel'
>;

/**
 * The parameters for the MessageChannel route.
 */
export type MessageChannelPageParams = {
  /**
   * The ID of the message channel to view.
   */
  id: string;
};

/**
 * Displays the page for a single message channel.
 * @constructor
 */
const MessageChannelPage: FC<MessageChannelPageProps> = ({
  route,
  navigation,
}) => {
  // Route params
  const { id: messageChannelId } = route.params;

  // API calls
  const { data: messageChannel } = useGetMessageChannelQuery(messageChannelId);
  const { data: messages, refetch: refetchMessages } =
    useGetMessagesQuery(messageChannelId);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchMessages();
    }, [refetchMessages]),
  );

  // Set the header title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${messageChannel?.employer.firstName} ${messageChannel?.employer.lastName}`,
    });
  }, [messageChannel, navigation]);

  if (messageChannel === undefined || messages === undefined) {
    return null;
  }

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <MessageChannelContent
        messageChannel={messageChannel}
        messages={messages}
      />
    </View>
  );
};

export default MessageChannelPage;
