import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Employer } from '@/models/entities/employer';
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
   * The function to call when the profile picture is pressed.
   */
  onProfilePress?: (employer: Employer) => void;
  /**
   * The list of message channels to display.
   */
  messageChannels: MessageChannel[];
};

const MessageChannelList: FC<MessageChannelListProps> = ({
  onItemPress,
  onProfilePress,
  messageChannels,
}) => {
  return (
    <View>
      {messageChannels?.map((messageChannel) => (
        <View key={messageChannel.id}>
          <MessageChannelItem
            onItemPress={onItemPress}
            onProfilePress={onProfilePress}
            messageChannel={messageChannel}
          />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default MessageChannelList;
