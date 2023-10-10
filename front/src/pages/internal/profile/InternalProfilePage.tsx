import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Appbar, Button, Divider, IconButton, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextField from '@/components/TextField';

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
  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action
            icon='pencil'
            onPress={navigation.navigate('MiscAppBar')}
          />
        </>
      ),
    });
  }, [navigation]);

  const data = [1, 1, 1, 1, 1];
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
            Bernard Tapie
          </Text>
          <View>
            <View style={styles.horizontalContainer}>
              <FlatList
                data={data}
                horizontal={true}
                renderItem={() => (
                  <MaterialCommunityIcons
                    name='star'
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
            <Text>
              Entrepreneur, politique et ancien propriétaire de l’Olympique de
              Marseille. Expérience étendue en business et services publics.
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Button icon='file-document'>Télecharger le cv</Button>
        </View>
        <View>
          <Text variant='titleLarge' style={{ marginBottom: 5 }}>
            Contact
          </Text>
          <TextField title='Téléphone' list={['06 95 15 48 76']} />
          <TextField
            title='Addresse e-mail'
            list={['bernard.tapie@gmail.com']}
          />
        </View>
        <View>
          <Text variant='titleLarge' style={{ marginBottom: 5 }}>
            Disponibilités
          </Text>
          <TextField
            title='Restauration'
            list={[
              '21 oct. - 14 mars',
              'Paris, 16ème arrondissement',
              '5 expériences passées',
            ]}
          />
          <TextField
            title='Événementiel'
            list={[
              '14 déc. - 23 août',
              'Paris, 16ème arrondissement',
              '1 expérience passée',
            ]}
          />
        </View>
        <View
          style={{
            ...styles.horizontalContainer,
            backgroundColor: '#FEF7FF',
          }}
        >
          <TextField
            title='Expériences'
            list={['3 expériences professionnelles']}
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
          <TextField title='Références & Avis' list={['2 avis']} />
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
