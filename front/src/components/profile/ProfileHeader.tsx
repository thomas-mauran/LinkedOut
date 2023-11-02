import { FC } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Divider, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from '@/utils/i18n';
import { starsIntoArray } from '@/utils/methods';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  shortBiography: string;
  averageRating: number;
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  profilePicture: {
    borderRadius: 50,
    height: 100,
    marginLeft: 15,
    marginRight: 30,
    width: 100,
  },
});

const ProfileHeader: FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  shortBiography,
  averageRating,
}) => {
  const theme = useTheme();

  return (
    <View>
      <View style={styles.horizontalContainer}>
        {/* TODO FETCH THE PICTURE FROM THE API */}
        <Image
          style={styles.profilePicture}
          source={{
            uri: 'https://www.challenges.fr/assets/img/2021/10/03/cover-r4x3w1000-61597036b4bce-000-9nw9nv.jpg',
          }}
        />
        <View style={styles.centerContainer}>
          <Text variant='headlineMedium'>
            {firstName} {lastName}
          </Text>
          <View>
            <View style={styles.horizontalContainer}>
              <FlatList
                data={starsIntoArray(averageRating)}
                horizontal={true}
                renderItem={({ item }) => (
                  <MaterialCommunityIcons
                    name={
                      item === 1
                        ? 'star'
                        : item === 0.5
                        ? 'star-half-full'
                        : 'star-outline'
                    }
                    size={24}
                    style={{ color: theme.colors.onSurface }}
                  />
                )}
              />
              <Text>{averageRating}</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.horizontalContainer}>
          <Divider />
          <Text>{shortBiography}</Text>
        </View>
      </View>
      <View>
        <Button icon='file-document'>
          {i18n.t('profile.info.downloadResume')}
        </Button>
      </View>
    </View>
  );
};

export default ProfileHeader;
