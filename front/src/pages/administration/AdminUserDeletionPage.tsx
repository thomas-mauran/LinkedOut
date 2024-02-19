import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import UserRequestingDeletionList from '@/components/administration/UserRequestingDeletionList';
import { useGetProfilesRequestingDeletionQuery } from '@/store/api/profileApiSlice';

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
      <UserRequestingDeletionList profiles={profiles} />
    </ScrollView>
  );
};

export default AdminUserDeletionPage;
