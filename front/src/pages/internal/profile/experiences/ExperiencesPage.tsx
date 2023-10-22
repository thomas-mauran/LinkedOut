import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, IconButton, Text } from 'react-native-paper';

import TextField from '@/components/TextField';
import { InternalMiscStackParamList } from '@/pages/internal/InternalMiscNav';
import { useGetExperiencesQuery } from '@/store/slice/api';
import i18n from '@/utils/i18n';

import { InternalProfileStackParamList } from '../../InternalProfileNav';

type InternalMiscPageProps = NativeStackScreenProps<
  InternalMiscStackParamList,
  'MiscMain'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 8,
  },
  divider: {
    marginVertical: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
type ExperiencesAppPageProps = NativeStackScreenProps<
  InternalProfileStackParamList,
  'Experiences'
>;
/**
 * The internal page for testing various stuff about React Native and the installed libraries.
 * @constructor
 */
const ExperiencesPage = ({ navigation }: ExperiencesAppPageProps) => {
  const { data: experiences } = useGetExperiencesQuery('');

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action
            icon={isEdited === true ? 'check' : 'pencil'}
            onPress={editButtonPressed}
          />
        </>
      ),
    });
  }, [navigation, isEdited]);

  const editButtonPressed = useCallback(() => {
    setIsEdited((prev) => !prev);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {experiences?.map((experience) => (
        <View key={experience.id} style={{ width: '100%' }}>
          <View style={styles.horizontalContainer}>
            <TextField
              style={{ marginLeft: 5 }}
              title={experience.job.title}
              list={[
                `${experience.startDate} - ${experience.endDate}`,
                `${experience.address.firstLine}, ${experience.address.city}, ${experience.address.zipCode}`,
              ]}
            />
            {isEdited && (
              <IconButton icon='pencil' style={styles.editBtnInline} />
            )}
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ExperiencesPage;
