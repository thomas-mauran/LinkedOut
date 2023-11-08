import * as Crypto from 'expo-crypto';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { palette } from '@/utils/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 50,
    display: 'flex',
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
});

type ProfilePicturePlaceholderProps = {
  username: string;
};

const ProfilePicturePlaceholder: FC<ProfilePicturePlaceholderProps> = ({
  username,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#000000'); // Initial color, change as required

  useEffect(() => {
    const getColor = async () => {
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        username,
      );
      let color = '#';
      for (let j = 0; j < 3; j++) {
        const value = parseInt(digest.slice(j * 8, j * 8 + 8), 16) % 255;
        color += ('00' + value.toString(16)).slice(-2);
      }
      setBackgroundColor(color);
    };
    getColor();
  }, [username]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={{color: palette.primary100}}>{username[0]}</Text>
    </View>
  );
};

export default ProfilePicturePlaceholder;
