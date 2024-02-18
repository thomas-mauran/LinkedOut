import * as ImagePicker from 'expo-image-picker';
import { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { useUploadProfilePictureMutation } from '@/store/api/profileApiSlice';
import i18n from '@/utils/i18n';

/**
 * Button to upload the profile picture of the user.
 * @constructor
 */
export const ProfileUploadPictureButton = () => {
  // API calls
  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  // Callbacks
  const handleUploadPicture = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      exif: false,
      quality: 0.4,
    });

    if (result.canceled === true || result.assets.length === 0) {
      return;
    }

    uploadProfilePicture(result.assets[0].uri);
  }, [uploadProfilePicture]);

  return (
    <Button
      mode='contained-tonal'
      onPress={handleUploadPicture}
      icon='image-plus'
    >
      {i18n.t('profile.info.uploadPicture')}
    </Button>
  );
};

export default ProfileUploadPictureButton;
