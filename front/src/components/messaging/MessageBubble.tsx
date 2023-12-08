import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Message, MessageDirection } from '@/models/entities/message';

/**
 * The styles for the MessageBubble component.
 */
const styles = StyleSheet.create({
  message: {
    borderRadius: 10,
    padding: 10,
  },
});

/**
 * The props for the MessageBubble component.
 */
type MessageBubbleProps = {
  /**
   * The message to display.
   */
  message: Message;
};

/**
 * Displays a message sent by a worker.
 * @constructor
 */
const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const theme = useTheme();

  const backgroundColor =
    message?.direction == MessageDirection.WorkerToEmployer
      ? theme.colors.primary
      : theme.colors.tertiary;
  const textAlign =
    message?.direction == MessageDirection.EmployerToWorker ? 'left' : 'right';
  const alignSelf =
    message?.direction == MessageDirection.EmployerToWorker
      ? 'flex-start'
      : 'flex-end';

  return (
    <View style={{ alignSelf }}>
      <Text
        variant='labelLarge'
        style={[
          styles.message,
          {
            backgroundColor,
            color: theme.colors.onPrimary,
            textAlign,
          },
        ]}
      >
        {message.content}
      </Text>
    </View>
  );
};

export default MessageBubble;
