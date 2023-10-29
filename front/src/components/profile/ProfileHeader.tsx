import React from 'react';
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
  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginRight: 30,
    marginLeft: 15,
  },
  experiencesButton: {
    backgroundColor: '#FEF7FF',
  },
});

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  shortBiography,
  averageRating,
}) => {
  const theme = useTheme();
  const isDarkTheme = theme.dark;
  return (
    <View style={{ flex: 1, marginLeft: 5 }}>
      <View style={styles.horizontalContainer}>
        {/* TODO FETCH THE PICTURE FROM THE API */}
        <Image
          style={styles.profilePicture}
          source={{
            uri: 'https://www.challenges.fr/assets/img/2021/10/03/cover-r4x3w1000-61597036b4bce-000-9nw9nv.jpg',
          }}
        />
        <View style={styles.centerContainer}>
          <Text variant='headlineMedium' style={{ marginBottom: 5 }}>
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
                    style={
                      isDarkTheme ? { color: 'white' } : { color: 'black' }
                    }
                  />
                )}
              />
              <Text
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 5,
                }}
              >
                {averageRating}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.horizontalContainer}>
          <Divider style={{ width: 3, height: '100%', marginRight: 10 }} />
          <Text style={{ textAlign: 'left', width: '97%' }}>
            {shortBiography}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Button icon='file-document'>
          {i18n.t('profile.info.downloadResume')}
        </Button>
      </View>
    </View>
  );
};

export default ProfileHeader;
