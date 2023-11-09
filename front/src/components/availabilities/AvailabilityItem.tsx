import { useLocales } from 'expo-localization';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { Availability } from '@/models/entities/availability';

/**
 * The styles for the AvailabilityItem component.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  editionContainer: {
    flexDirection: 'row',
  },
  itemText: {
    marginBottom: 4,
  },
  itemTitle: {
    marginBottom: 2,
    marginTop: 8,
  },
  textContainer: {
    flex: 1,
  },
});

/**
 * The props for the AvailabilityItem component.
 */
type AvailabilityItemProps = {
  /**
   * The availability to display.
   */
  availability: Availability;

  /**
   * Whether to display the buttons to edit the availability.
   */
  isEditing?: boolean;

  /**
   * The function to call when the edit button is pressed.
   */
  onEditPress?: (availability: Availability) => void;

  /**
   * The function to call when the delete button is pressed.
   */
  onDeletePress?: (availability: Availability) => void;
};

/**
 * Displays an availability item.
 * @constructor
 */
const AvailabilityItem: FC<AvailabilityItemProps> = ({
  availability,
  isEditing,
  onEditPress,
  onDeletePress,
}) => {
  // Hooks
  const locales = useLocales();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant='labelLarge' style={styles.itemTitle}>
          {availability?.jobCategory.category}
        </Text>

        <Text style={styles.itemText}>
          {new Date(availability.startDate).toLocaleDateString(
            locales[0].languageTag,
          )}{' '}
          -{' '}
          {new Date(availability.endDate).toLocaleDateString(
            locales[0].languageTag,
          )}
        </Text>

        <Text style={styles.itemText}>
          {availability?.address.firstLine}, {availability?.address.city},{' '}
          {availability?.address.zipCode}
        </Text>
      </View>

      {isEditing && (
        <View style={styles.editionContainer}>
          <IconButton
            icon='pencil'
            onPress={() => onEditPress?.(availability)}
          />

          <IconButton
            icon='trash-can'
            onPress={() => onDeletePress?.(availability)}
          />
        </View>
      )}
    </View>
  );
};

export default AvailabilityItem;
