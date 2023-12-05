import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Message } from '@/models/entities/message';

import MessageBubbleEmployer from './MessageBubbleEmployer';
import MessageBubbleWorker from './MessageBubbleWorker';

/**
 * The styles for the MessageList component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: '80%',
    marginBottom: 60,
    width: '100%',
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
    <ScrollView style={styles.container}>
      {messages?.map((message) => (
        <View key={message.id}>
          {message.direction == 0 ? (
            <MessageBubbleWorker message={message} />
          ) : (
            <MessageBubbleEmployer message={message} />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default MessageList;
