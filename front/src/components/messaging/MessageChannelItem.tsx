import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { MessageChannel } from '@/models/entities/messageChannel';

/**
 * The styles for the MessageChannelItem component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  nameText: {
    marginBottom: 5,
  },
  profilePicture: {
    borderRadius: 48,
    height: 60,
    width: 60,
  },
  verticalCenter: {
    justifyContent: 'center',
  },
});

/**
 * The props for the MessageChannelItem component.
 */
type MessageChannelItemProps = {
  /**
   * The function to call when an a message channel is pressed.
   */
  onItemPress?: (messageChannel: MessageChannel) => void;

  /**
   * The message channel to display.
   */
  messageChannel: MessageChannel;
};

/**
 * Displays a message channel.
 * @constructor
 */
const MessageChannelItem: FC<MessageChannelItemProps> = ({
  onItemPress,
  messageChannel,
}) => {
  return (
    <TouchableRipple onPress={() => onItemPress?.(messageChannel)}>
      <View style={[styles.container, styles.horizontalContainer]}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: messageChannel.employer?.picture,
          }}
        />
        <View style={styles.verticalCenter}>
          <Text
            variant='labelLarge'
            style={styles.nameText}
          >{`${messageChannel.employer.firstName} ${messageChannel.employer.lastName}`}</Text>

          <Text>{`${messageChannel.lastMessage}`}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default MessageChannelItem;
