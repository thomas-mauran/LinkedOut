import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Message } from '@/models/entities/message';

import MessageBubble from './MessageBubble';

/**
 * The styles for the MessageList component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
});

type MessageListProps = {
  /**
   * The list of messages of a message channels to display.
   */
  messages: Message[];
};

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages?.map((message) => (
        <View key={message.id}>
          <MessageBubble message={message} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MessageList;
