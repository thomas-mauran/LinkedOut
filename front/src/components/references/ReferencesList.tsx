import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { Reference } from '@/models/types';
import { ProfileStackParamList } from '@/pages/profile/ProfileNav';
import {
  useDeleteReferenceMutation,
  useGetReferencesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

import ProfilePicturePlaceholder from '../utils/ProfilePicturePlaceholder';

interface ReferencesListProps {
  isEditing?: boolean;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  editBtnInline: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
});

const ReferencesList: FC<ReferencesListProps> = ({ isEditing, navigation }) => {
  const [deleteReference] = useDeleteReferenceMutation();
  const { data: references, refetch } = useGetReferencesQuery('');

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const editButtonReference = useCallback(
    (availability: Partial<Reference>) => {
      navigation.navigate('ReferenceUpdate', { ...availability });
    },
    [navigation],
  );

  const trashcanButtonReference = useCallback(
    (reference: Partial<Reference>) => {
      Alert.alert(
        i18n.t('profile.references.delete'),
        i18n.t('profile.references.deleteConfirm'),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.delete'),
            onPress: () => {
              deleteReference(reference.id)
                .unwrap()
                .then(() => {
                  refetch();
                });
            },
          },
        ],
      );
    },
    [deleteReference, refetch],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant='headlineMedium'>{i18n.t('profile.info.references')}</Text>
      {references?.map((reference) => (
        <View key={reference.id} style={styles.horizontalContainer}>
          <View>
            <View style={styles.horizontalContainer}>
              <View style={styles.horizontalContainer}>
                <ProfilePicturePlaceholder
                  username={`${reference.firstName}${reference.lastName}`}
                />
                <View>
                  <Text>{reference.firstName}</Text>
                  <Text>{reference.lastName}</Text>
                </View>
              </View>
            </View>
          </View>
          {isEditing && (
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
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ReferencesList;
