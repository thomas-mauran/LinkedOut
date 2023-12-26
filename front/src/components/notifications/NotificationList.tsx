import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Notification } from '@/models/entities/notification';

import NotificationItem from './NotificationItem';

/**
 * The styles for the NotificationList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

type NotificationListProps = {
  /**
   * The list of notifications to display.
   */
  notifications: Notification[];
};

const NotificationList: FC<NotificationListProps> = ({ notifications }) => {
  return (
    <View>
      {notifications?.map((notification) => (
        <View key={notification.id}>
          <NotificationItem notification={notification} />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default NotificationList;
