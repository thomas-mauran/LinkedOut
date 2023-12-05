import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { Message } from '@/models/entities/message';

/**
 * The styles for the MessageBubbleEmployer component.
 */
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  message: {
    borderRadius: 10,
    marginBottom: 30,
    padding: 10,
    textAlign: 'right',
  },
});

/**
 * The props for the MessageBubbleEmployer component.
 */
type MessageBubbleEmployerProps = {
  /**
   * The message to display.
   */
  message: Message;
};

/**
 * Displays a message sent by an employer.
 * @constructor
 */
const MessageBubbleEmployer: FC<MessageBubbleEmployerProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        variant='labelLarge'
        style={[
          styles.message,
          {
            backgroundColor: theme.colors.tertiary,
            color: theme.colors.onPrimary,
          },
        ]}
      >
        {message.content}
      </Text>
    </View>
  );
};

export default MessageBubbleEmployer;
