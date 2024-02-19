import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import UserRequestingDeletionList from '@/components/administration/UserRequestingDeletionList';
import { Profile } from '@/models/entities/profile';
import {
  useDeleteProfileMutation,
  useGetProfilesRequestingDeletionQuery,
} from '@/store/api/profileApiSlice';
import i18n from '@/utils/i18n';

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
 * The administration page for deleting users.
 * @constructor
 */
export const AdminUserDeletionPage = () => {
  // API calls
  const { data: profiles, refetch: refetchProfiles } =
    useGetProfilesRequestingDeletionQuery();

  const [deleteProfile] = useDeleteProfileMutation();

  // Callbacks
  const handleUserDeletion = useCallback(
    (profile: Profile) => {
      Alert.alert(
        i18n.t('admin.userDeletion.dialogTitle'),
        i18n.t('admin.userDeletion.dialogMessage', {
          name: `${profile.firstName} ${profile.lastName}`,
        }),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.delete'),
            onPress: () => deleteProfile(profile.id),
            style: 'destructive',
          },
        ],
      );
    },
    [deleteProfile],
  );

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchProfiles();
    }, [refetchProfiles]),
  );

  if (profiles === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <UserRequestingDeletionList
        profiles={profiles}
        onItemPress={handleUserDeletion}
      />
    </ScrollView>
  );
};

export default AdminUserDeletionPage;
