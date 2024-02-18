import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { CreateEmployerMessageDto } from '@/models/dtos/employer/createEmployerMessageDto';
import { Message } from '@/models/entities/message';
import { usePostEmployerMessageMutation } from '@/store/api/employerApiSlice';
import i18n from '@/utils/i18n';

/**
 * The styles for the JobOfferMessageSender component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  textInput: {
    flex: 1,
  },
});

/**
 * The props for the JobOfferMessageSender component.
 */
type JobOfferMessageSenderProps = {
  /**
   * The employer ID to send the message to.
   */
  employerId: string;

  /**
   * The function to call when a message has been sent.
   */
  onMessageSent?: (message: Message) => void;
};

/**
 * Form for sending a message to the employer that posted the job offer.
 * @constructor
 */
export const JobOfferMessageSender: FC<JobOfferMessageSenderProps> = ({
  employerId,
  onMessageSent,
}) => {
  // Hooks
  const [content, setContent] = useState('');

  // API calls
  const [postMessage] = usePostEmployerMessageMutation();

  // Callbacks
  const handleSendMessage = useCallback(() => {
    const message: CreateEmployerMessageDto = {
      employerId,
      content,
    };

    postMessage(message).then((res) => {
      if ('error' in res) {
        return;
      }

      setContent('');
      onMessageSent?.(res.data);
    });
  }, [content, employerId, onMessageSent, postMessage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={i18n.t('messaging.info.textInputPlaceholder')}
        value={content}
        onChangeText={setContent}
        mode={'outlined'}
      />

      <Button mode={'contained'} onPress={handleSendMessage}>
        {i18n.t('common.submit')}
      </Button>
    </View>
  );
};
