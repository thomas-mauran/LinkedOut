import * as DocumentPicker from 'expo-document-picker';
import { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { useUploadResumeMutation } from '@/store/api/profileApiSlice';
import i18n from '@/utils/i18n';

/**
 * Button to upload the resume of the user.
 * @constructor
 */
export const ProfileUploadResumeButton = () => {
  // API calls
  const [uploadResume] = useUploadResumeMutation();

  // Callbacks
  const handleUploadResume = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.canceled === true || result.assets.length === 0) {
      return;
    }

    uploadResume(result.assets[0].uri);
  }, [uploadResume]);

  return (
    <Button
      mode='contained-tonal'
      onPress={handleUploadResume}
      icon='file-upload-outline'
    >
      {i18n.t('profile.info.uploadResume')}
    </Button>
  );
};

export default ProfileUploadResumeButton;
