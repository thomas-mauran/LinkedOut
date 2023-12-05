import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput, useTheme } from 'react-native-paper';

import { usePostMessageMutation } from '@/store/api/messagingApiSlice';
import i18n from '@/utils/i18n';

/**
 * The styles for the MessageTextInput component.
 */
const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    width: '100%',
  },
  sendButton: {
    borderRadius: 50,
    padding: 10,
  },
  textInput: {
    width: '85%',
  },
});

/**
 * The props for the MessageTextInput component.
 */
type MessageTextInputProps = {
  /**
   * The messages channel id.
   */
  messageChannelId: string;
};

const MessageTextInput: FC<MessageTextInputProps> = ({ messageChannelId }) => {
  const theme = useTheme();
  // API calls
  const [content, setContent] = useState('');
  const [postMessage] = usePostMessageMutation();

  // Callbacks
  const onSendPress = () => {
    postMessage({ id: messageChannelId, content });
    setContent('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label={i18n.t('messaging.info.textInputPlaceholer')}
        value={content}
        onChangeText={setContent}
      />
      <IconButton
        icon='arrow-right-bold'
        onPress={onSendPress}
        style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}
        iconColor={theme.colors.onPrimary}
      />
    </View>
  );
};

export default MessageTextInput;
