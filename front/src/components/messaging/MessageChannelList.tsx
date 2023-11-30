import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { MessageChannel } from '@/models/entities/messageChannel';

import MessageChannelItem from './MessageChannelItem';

/**
 * The styles for the MessageChannelList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

type MessageChannelListProps = {
  /**
   * The function to call when an a message channel is pressed.
   */
  onItemPress?: (messageChannel: MessageChannel) => void;

  /**
   * The list of message channels to display.
   */
  messageChannels: MessageChannel[];
};

const MessageChannelList: FC<MessageChannelListProps> = ({
  onItemPress,
  messageChannels,
}) => {
  return (
    <View>
      {messageChannels?.map((messageChannel) => (
        <View key={messageChannel.id}>
          <MessageChannelItem
            onItemPress={onItemPress}
            messageChannel={messageChannel}
          />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default MessageChannelList;
