import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import { InternalMiscStackParamList } from '@/pages/internal/InternalMiscNav';

type InternalMiscAppBarPageProps = NativeStackScreenProps<
  InternalMiscStackParamList,
  'MiscAppBar'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

/**
 * The internal page for testing the custom appbar back and action buttons.
 * @constructor
 */
const InternalMiscAppBarPage = ({
  navigation,
}: InternalMiscAppBarPageProps) => {
  // Picture rotation (in degrees)
  const [rotation, setRotation] = useState(0);

  const rotateLeft = useCallback(() => {
    setRotation((prev) => (prev - 45) % 360);
  }, []);

  const rotateRight = useCallback(() => {
    setRotation((prev) => (prev + 45) % 360);
  }, []);

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action icon='rotate-left' onPress={rotateLeft} />
          <Appbar.Action icon='rotate-right' onPress={rotateRight} />
        </>
      ),
    });
  }, [navigation, rotateLeft, rotateRight]);

  // Dynamic style for applying a rotation transform to the picture
  const transformStyle: StyleProp<ImageStyle> = {
    transform: [
      {
        rotate: `${rotation}deg`,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, transformStyle]}
        source={{ uri: 'https://i.imgflip.com/41rbv4.png' }}
      />
    </View>
  );
};

export default InternalMiscAppBarPage;
