import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Appbar, Button, Divider, IconButton, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextField from '@/components/TextField';
import {
  useGetAvailabilitiesQuery,
  useGetExperiencesQuery,
  useGetProfileQuery,
  useGetReferencesQuery,
} from '@/store/slice/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
  },
  headline: {
    fontStyle: 'italic',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

/**
 * The internal page that has links to all the application pages.
 * @constructor
 */
const InternalProfilePage = ({ navigation }) => {
  const { data: profile } = useGetProfileQuery('');
  const { data: availabilities } = useGetAvailabilitiesQuery('');

  // useEffect(() => {
  //   // Set the action buttons in the appbar for rotating the picture
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <>
  //         <Appbar.Action
  //           icon='pencil'
  //           onPress={navigation.navigate('MiscAppBar')}
  //         />
  //       </>
  //     ),
  //   });
  // }, [navigation]);

  const starsIntoArray = function (num: number) {
    let resultArray = [];
    let remaining = num;

    for (let i = 0; i < 5; i++) {
      if (remaining >= 1) {
        resultArray.push(1);
        remaining -= 1;
      } else if (remaining >= 0.5) {
        resultArray.push(0.5);
        remaining -= 0.5;
      } else {
        resultArray.push(0);
        remaining -= 0;
      }
      console.log('remaining', remaining);
    }

    return resultArray;
  };

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.horizontalContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: 'https://www.challenges.fr/assets/img/2021/10/03/cover-r4x3w1000-61597036b4bce-000-9nw9nv.jpg',
          }}
        />
        <View style={styles.centerContainer}>
          <Text variant='headlineMedium' style={{ marginBottom: 5 }}>
            {profile?.firstName} {profile?.lastName}
          </Text>
          <View>
            <View style={styles.horizontalContainer}>
              <FlatList
                data={starsIntoArray(profile?.averageRating)}
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
                5
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginRight: 10, marginLeft: 10 }}>
        <View style={{ marginTop: 10 }}>
          <View style={styles.horizontalContainer}>
            <Divider style={{ width: 3, height: '100%', marginRight: 10 }} />
            <Text>{profile?.shortBiography}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Button icon='file-document'>Télecharger le cv</Button>
        </View>
        <View>
          <Text variant='titleLarge' style={{ marginBottom: 5 }}>
            Contact
          </Text>
          <TextField title='Téléphone' list={[profile?.phone]} />
          <TextField title='Addresse e-mail' list={[profile?.email]} />
        </View>
        <View>
          <Text variant='titleLarge' style={{ marginBottom: 5 }}>
            Disponibilités
          </Text>
          {availabilities?.map((availability) => (
            <View>
              <TextField
                title='Restauration'
                list={[
                  `${availability?.startDate} - ${availability?.endDate}`,
                  availability?.geographicArea,
                ]}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            ...styles.horizontalContainer,
            backgroundColor: '#FEF7FF',
          }}
        >
          <TextField
            title='Expériences'
            list={[`${profile?.nbExperiences} expériences`]}
          />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={[
                isDarkTheme ? { color: 'white' } : { color: 'black' },
                { marginTop: 'auto', marginBottom: 'auto', marginRight: 10 },
              ]}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.horizontalContainer,
          }}
        >
          <TextField
            title='Références & Avis'
            list={[`${profile?.nbReviews} avis`]}
          />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={[
                isDarkTheme ? { color: 'white' } : { color: 'black' },
                { marginTop: 'auto', marginBottom: 'auto', marginRight: 10 },
              ]}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InternalProfilePage;
