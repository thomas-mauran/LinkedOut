import { getHeaderTitle } from '@react-navigation/elements';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type ProfilePictureGeneratorProps = {
  username: string;
};

/**
 * Replacement for the react-navigation header using react-native-paper's Appbar component.
 * @constructor
 */
const ProfilePictureGenerator = ({
  username,
}: ProfilePictureGeneratorProps) => {
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let j = 0; j < 3; j++) {
      let value = (hash >> (j * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  console.log(username);
  return (
    <View
      style={[styles.container, { backgroundColor: stringToColor(username) }]}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        {username[0]}
      </Text>
    </View>
  );
};

export default ProfilePictureGenerator;
