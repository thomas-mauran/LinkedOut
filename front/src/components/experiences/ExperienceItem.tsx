import { useLocales } from 'expo-localization';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { Experience } from '@/models/entities/experience';

/**
 * The styles for the ExperienceItem component.
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
  textContainer: {
    flex: 1,
  },
});

/**
 * The props for the ExperienceItem component.
 */
type ExperienceItemProps = {
  /**
   * The experience to display.
   */
  experience: Experience;

  /**
   * Whether to display the buttons to edit the experience.
   */
  isEditing?: boolean;

  /**
   * The function to call when the edit button of an item is pressed.
   */
  onEditPress?: (experience: Experience) => void;

  /**
   * The function to call when the delete button of an item is pressed.
   */
  onDeletePress?: (experience: Experience) => void;
};

/**
 * Displays an experience item.
 * @constructor
 */
const ExperienceItem: FC<ExperienceItemProps> = ({
  experience,
  isEditing,
  onEditPress,
  onDeletePress,
}) => {
  // Hooks
  const locales = useLocales();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant='labelLarge' style={styles.itemText}>
          {experience.job.title}
        </Text>

        <Text style={styles.itemText}>
          {new Date(experience.startDate).toLocaleDateString(
            locales[0].languageTag,
          )}{' '}
          -{' '}
          {new Date(experience.endDate).toLocaleDateString(
            locales[0].languageTag,
          )}
        </Text>

        <Text style={styles.itemText}>
          {experience.address.firstLine}, {experience.address.city},{' '}
          {experience.address.zipCode}
        </Text>
      </View>

      {isEditing && (
        <View style={styles.editionContainer}>
          <IconButton icon='pencil' onPress={() => onEditPress?.(experience)} />

          <IconButton
            icon='trash-can'
            onPress={() => onDeletePress?.(experience)}
          />
        </View>
      )}
    </View>
  );
};

export default ExperienceItem;
