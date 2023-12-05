import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Message } from '@/models/entities/message';

/**
 * The styles for the MessageBubbleWorker component.
 */
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  message: {
    borderRadius: 10,
    marginBottom: 30,
    padding: 10,
    textAlign: 'right',
  },
});

/**
 * The props for the MessageBubbleWorker component.
 */
type MessageBubbleWorkerProps = {
  /**
   * The message to display.
   */
  message: Message;
};

/**
 * Displays a message sent by a worker.
 * @constructor
 */
const MessageBubbleWorker: FC<MessageBubbleWorkerProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        variant='labelLarge'
        style={[
          styles.message,
          {
            backgroundColor: theme.colors.primary,
            color: theme.colors.onPrimary,
          },
        ]}
      >
        {message.content}
      </Text>
    </View>
  );
};

export default MessageBubbleWorker;
