import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import EvaluationList from '@/components/evaluations/EvaluationList';
import ReferenceList from '@/components/references/ReferenceList';
import { Reference } from '@/models/types';
import { useGetEvaluationsQuery } from '@/store/api/evaluationApiSlice';
import {
  useDeleteReferenceMutation,
  useGetReferencesQuery,
} from '@/store/api/referenceApiSlice';
import i18n from '@/utils/i18n';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the ReferencesPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the ReferencesPage component.
 */
type ReferencesPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'References'
>;

/**
 * Displays the page for the references and reviews.
 * @constructor
 */
const ReferencesPage: FC<ReferencesPageProps> = ({ navigation }) => {
  // API calls
  const { data: evaluations, refetch: refetchEvaluations } =
    useGetEvaluationsQuery();

  const { data: references, refetch: refetchReferences } =
    useGetReferencesQuery();
  const [deleteReference] = useDeleteReferenceMutation();

  // Hooks
  const [isEditing, setIsEditing] = useState(false);

  // Callbacks
  const handleEditPress = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleCreatePress = useCallback(() => {
    navigation.navigate('ReferenceCreate');
  }, [navigation]);

  const handleEditReferencePress = useCallback(
    (availability: Partial<Reference>) => {
      navigation.navigate('ReferenceUpdate', {
        id: availability.id,
      });
    },
    [navigation],
  );

  const handleDeleteReferencePress = useCallback(
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
            onPress: () => deleteReference(reference.id),
            style: 'destructive',
          },
        ],
      );
    },
    [deleteReference],
  );

  // Set the header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {isEditing && (
            <Appbar.Action icon={'plus'} onPress={handleCreatePress} />
          )}
          <Appbar.Action
            icon={isEditing === true ? 'check' : 'pencil'}
            onPress={handleEditPress}
          />
        </>
      ),
    });
  }, [handleCreatePress, handleEditPress, navigation, isEditing]);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchEvaluations();
      refetchReferences();
    }, [refetchEvaluations, refetchReferences]),
  );

  if (evaluations === undefined || references === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant='headlineMedium'>{i18n.t('profile.info.references')}</Text>
      <ReferenceList
        references={references}
        isEditing={isEditing}
        onItemEditPress={handleEditReferencePress}
        onItemDeletePress={handleDeleteReferencePress}
      />

      <Text variant='headlineMedium'>{i18n.t('profile.info.reviews')}</Text>
      <EvaluationList evaluations={evaluations} />
    </ScrollView>
  );
};

export default ReferencesPage;
