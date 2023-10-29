import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { Reference } from '@/models/types';
import {
  useDeleteReferenceMutation,
  useGetReferencesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

import ProfilePicturePlaceholder from '../utils/ProfilePicturePlaceholder';

interface ReferencesListProps {
  isEditing?: boolean;
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

  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  divider: {
    marginVertical: 8,
  },
});

const ReferencesList: React.FC<ReferencesListProps & { navigation: any }> = ({
  isEditing,
  navigation,
}) => {
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
      navigation.navigate('ReferencesUpdate', { ...availability });
    },
    [navigation, references],
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
            onPress: () => handleDelete(reference),
          },
        ],
      );
    },
    [],
  );

  const handleDelete = (reference: Partial<Reference>) => {
    deleteReference(reference.id)
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant='headlineMedium' style={{ marginBottom: 20 }}>
        {i18n.t('profile.info.references')}
      </Text>
      {references?.map((reference) => (
        <View key={reference.id} style={styles.horizontalContainer}>
          <View style={{ width: '80%' }}>
            <View style={styles.horizontalContainer}>
              <View
                style={[
                  styles.horizontalContainer,
                  { justifyContent: 'flex-start', marginBottom: 10 },
                ]}
              >
                <ProfilePicturePlaceholder
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
            </View>
          </View>
          {isEditing && (
            <View
              style={[
                styles.horizontalContainer,
                {
                  justifyContent: 'space-around',
                  width: '20%',
                },
              ]}
            >
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
