import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import { Appbar, Divider, IconButton, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePictureGenerator from '@/components/utils/ProfilePictureGenerator';
import {
  useDeleteReferenceMutation,
  useGetEvaluationsQuery,
  useGetReferencesQuery,
} from '@/store/slice/api';
import { Reference } from '@/store/slice/types';
import i18n from '@/utils/i18n';
import { starsIntoArray } from '@/utils/methods';

import { InternalProfileStackParamList } from '../../InternalProfileNav';

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
type ReferencesAppPageProps = NativeStackScreenProps<
  InternalProfileStackParamList,
  'References'
>;
/**
 * The internal page for testing various stuff about React Native and the installed libraries.
 * @constructor
 */
const ReferencesPage = ({ navigation }: ReferencesAppPageProps) => {
  // Constants

  // Hooks
  const { data: references, refetch } = useGetReferencesQuery('');
  const [deleteReference] = useDeleteReferenceMutation();
  const { data: evaluations } = useGetEvaluationsQuery('');

  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          {isEdited && (
            <Appbar.Action icon={'plus'} onPress={createButtonPressed} />
          )}
          <Appbar.Action
            icon={isEdited === true ? 'check' : 'pencil'}
            onPress={editButtonPressed}
          />
        </>
      ),
    });
  }, [navigation, isEdited]);

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Methods
  const editButtonPressed = useCallback(() => {
    setIsEdited((prev) => !prev);
  }, []);
  const createButtonPressed = useCallback(() => {
    navigation.navigate('ReferencesUpdate', {});
  }, [navigation]);

  const editButtonReference = useCallback(
    (reference: Reference) => {
      navigation.navigate('ReferencesUpdate', { ...reference });
    },
    [navigation],
  );

  const trashcanButtonReference = useCallback((reference: Reference) => {
    deleteReference(reference.id)
      .unwrap()
      .then(() => {
        refetch();
      });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant='headlineMedium' style={{ marginBottom: 20 }}>
        {i18n.t('profile.info.references')}
      </Text>
      {references?.map((reference) => (
        <View key={reference.id} style={{ width: '100%' }}>
          <View style={styles.horizontalContainer}>
            <View
              style={[
                styles.horizontalContainer,
                { justifyContent: 'flex-start', marginBottom: 10 },
              ]}
            >
              <ProfilePictureGenerator
                username={`${reference.firstName}${reference.lastName}`}
              />
              <View
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: 10,
                }}
              >
                <Text>{reference.firstName}</Text>
                <Text>{reference.lastName}</Text>
              </View>
            </View>
            {isEdited && (
              <View style={styles.horizontalContainer}>
                <IconButton
                  icon='pencil'
                  style={styles.editBtnInline}
                  onPress={() => editButtonReference(reference)}
                />
                <IconButton
                  icon='trash-can'
                  style={styles.editBtnInline}
                  onPress={() => trashcanButtonReference(reference)}
                />
              </View>
            )}
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
      <Text variant='headlineMedium' style={{ marginBottom: 10 }}>
        {i18n.t('profile.info.reviews')}
      </Text>
      {evaluations?.map((evaluation) => (
        <View key={evaluation.id} style={{ width: '100%' }}>
          <View
            style={[
              styles.horizontalContainer,
              { justifyContent: 'flex-start', marginBottom: 10 },
            ]}
          >
            <ProfilePictureGenerator
              username={`${evaluation.employerFirstName}${evaluation.employerLastName}`}
            />
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 10,
              }}
            >
              <Text>
                {`${evaluation.employerFirstName} ${evaluation.employerLastName}`}
              </Text>
              <FlatList
                data={starsIntoArray(evaluation?.score)}
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
            </View>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ marginBottom: 10 }}>{`"${evaluation.review}"`}</Text>
            <Text>
              {new Date(evaluation.createdAt).toLocaleDateString('en-US')}
            </Text>
          </View>
          <Divider style={[styles.divider, { marginTop: 20 }]} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ReferencesPage;
