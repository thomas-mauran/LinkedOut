import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
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
});

/**
 * The internal page that has links to all the application pages.
 * @constructor
 */
const InternalProfilePage = () => {
  const data = [1, 1, 1, 1, 1];

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
            Bernard tapie
          </Text>
          <View>
            <View style={styles.horizontalContainer}>
              <FlatList
                data={data}
                horizontal={true}
                renderItem={() => (
                  <MaterialCommunityIcons name='star' size={24} />
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
      <View style={{ marginTop: 10 }}>
        <View style={styles.horizontalContainer}>
          <Divider style={{ width: 3, height: '100%', marginRight: 10 }} />
          <Text>
            Entrepreneur, politique et ancien propriétaire de l’Olympique de
            Marseille. Expérience étendue en business et services publics.
          </Text>
        </View>
      </View>
      <View>
        <Button icon='file-document'>Télecharger le cv</Button>
      </View>
      <View>
        <Text variant='titleLarge' style={{ marginBottom: 5 }}>
          Contact
        </Text>
        <TextField title='Téléphone' list={['06 95 15 48 76']} />
        <TextField title='Addresse e-mail' list={['bernard.tapie@gmail.com']} />
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
    </ScrollView>
  );
};

export default InternalProfilePage;
