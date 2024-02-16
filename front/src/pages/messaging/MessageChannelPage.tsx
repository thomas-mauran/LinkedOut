import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

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
  contentContainer: {
    flex: 1,
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

  // Callbacks
  const handleInfoPress = useCallback(() => {
    navigation.navigate('EmployerEvaluation', {
      id: messageChannel.employer.id,
    });
  }, [messageChannel, navigation]);

  // Set the header title and button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${messageChannel?.employer.firstName} ${messageChannel?.employer.lastName}`,
      headerRight: () => (
        <Appbar.Action icon={'information-outline'} onPress={handleInfoPress} />
      ),
    });
  }, [handleInfoPress, messageChannel, navigation]);

  if (messageChannel === undefined || messages === undefined) {
    return null;
  }

  return (
    <View style={styles.contentContainer}>
      <MessageChannelContent
        messageChannel={messageChannel}
        messages={messages}
      />
    </View>
  );
};

export default MessageChannelPage;
