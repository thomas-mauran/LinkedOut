import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';

import { useAppSelector } from '@/store/hooks';
import i18n from '@/utils/i18n';

/**
 * Button to share the resume of the user.
 * @constructor
 */
export const ProfileShareResumeButton = () => {
  // Store hooks
  const auth = useAppSelector((state) => state.auth);

  // Callbacks
  const handleDownloadResume = useCallback(async () => {
    if (auth.state !== 'authenticated') {
      return;
    }

    const downloadResult = await FileSystem.downloadAsync(
      `${process.env.EXPO_PUBLIC_API_URL}/profile/cv`,
      FileSystem.cacheDirectory + 'cv.pdf',
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );

    if (downloadResult.status !== 200) {
      if (downloadResult.status === 404) {
        Alert.alert(
          i18n.t('profile.info.resumeNotFound.title'),
          i18n.t('profile.info.resumeNotFound.message'),
        );
      } else {
        Alert.alert(
          i18n.t('profile.info.resumeDownloadError.title'),
          i18n.t('profile.info.resumeDownloadError.message'),
        );
      }

      return;
    }

    await Sharing.shareAsync(downloadResult.uri);
  }, [auth]);

  return (
    <Button
      mode='contained-tonal'
      onPress={handleDownloadResume}
      icon='file-document-outline'
    >
      {i18n.t('profile.info.shareResume')}
    </Button>
  );
};

export default ProfileShareResumeButton;
