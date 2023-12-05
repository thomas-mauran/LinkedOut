import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import MessagingList from '@/components/messaging/MessageChannelList';
import { MessageChannel } from '@/models/entities/messageChannel';
import { useGetMessageChannelsQuery } from '@/store/api/messagingApiSlice';

import { MessagingStackParamList } from './MessagingNav';

/**
 * The styles for the MessagingListPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the MessagingListPage component.
 */
type MessagingListPageProps = NativeStackScreenProps<
  MessagingStackParamList,
  'MessageChannelList'
>;

/**
 * Displays the page of message channels for the current user.
 * @constructor
 */
const MessageChannelListPage: FC<MessagingListPageProps> = ({ navigation }) => {
  // API calls
  const { data: messageChannels, refetch: refetchMessageChannels } =
    useGetMessageChannelsQuery();

  // Callbacks
  const handleMessageChannelPress = useCallback(
    (messageChannel: MessageChannel) => {
      navigation.navigate('MessageChannel', { id: messageChannel.id });
    },
    [navigation],
  );

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchMessageChannels();
    }, [refetchMessageChannels]),
  );

  if (messageChannels === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <MessagingList
        onItemPress={handleMessageChannelPress}
        messageChannels={messageChannels}
      />
    </ScrollView>
  );
};

export default MessageChannelListPage;
