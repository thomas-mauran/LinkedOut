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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  textInput: {
    flex: 1,
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
  // Hooks
  const theme = useTheme();
  const [content, setContent] = useState('');

  // API calls
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
        placeholder={i18n.t('messaging.info.textInputPlaceholder')}
        value={content}
        onChangeText={setContent}
        mode={'outlined'}
      />
      <IconButton
        icon='send-outline'
        onPress={onSendPress}
        style={{ backgroundColor: theme.colors.primary }}
        iconColor={theme.colors.onPrimary}
      />
    </View>
  );
};

export default MessageTextInput;
