import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Notification } from '@/models/entities/notification';

/**
 * The styles for the NotificationItem component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  verticalContainer: {
    flexDirection: 'column',
    gap: 12,
  },
});

/**
 * The props for the NotificationItem component.
 */
type NotificationItemProps = {
  /**
   * The notification to display.
   */
  notification: Notification;
};

/**
 * Displays a notification.
 * @constructor
 */
const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  return (
    <View>
      <View style={[styles.container, styles.verticalContainer]}>
        <Text variant='labelLarge'>{`${notification.title}`}</Text>
        <Text>{`${notification.content}`}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;
