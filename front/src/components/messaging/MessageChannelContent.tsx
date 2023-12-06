import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Message } from '@/models/entities/message';
import { MessageChannel } from '@/models/entities/messageChannel';

import MessageList from './MessageList';
import MessageTextInput from './MessageTextInput';

/**
 * The styles for the MessageChannelContent component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});

/**
 * The props for the MessageChannelContent component.
 */
type MessageChannelContentProps = {
  /**
   * The message channel to display.
   */
  messageChannel: MessageChannel;

  /**
   * The messages of the message channel.
   */
  messages: Message[];
};

/**
 * Displays the the conversation of a message channel.
 * @constructor
 */
const MessageChannelContent: FC<MessageChannelContentProps> = ({
  messageChannel,
  messages,
}) => {
  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
      <MessageTextInput messageChannelId={messageChannel.id} />
    </View>
  );
};

export default MessageChannelContent;
