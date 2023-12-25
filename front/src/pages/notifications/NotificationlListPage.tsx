import { useFocusEffect } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import NotificationList from '@/components/notifications/NotificationList';
import { useGetNotificationsQuery } from '@/store/api/notificationApiSlice';

/**
 * The styles for the NotificationListPage component.
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
 * Displays the page of notifications for the current user.
 * @constructor
 */
const NotificationListPage: FC = () => {
  // API calls
  const { data: notifications, refetch: refetchNotifications } =
    useGetNotificationsQuery();

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchNotifications();
    }, [refetchNotifications]),
  );

  if (notifications === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <NotificationList notifications={notifications} />
    </ScrollView>
  );
};

export default NotificationListPage;
