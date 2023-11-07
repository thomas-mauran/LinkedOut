import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import ExperienceItem from '@/components/experiences/ExperienceItem';
import { Experience } from '@/models/entities/experience';

/**
 * The styles for the ExperienceList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
  itemContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

/**
 * The props for the ExperienceList component.
 */
type ExperienceListProps = {
  /**
   * The list of experiences to display.
   */
  experiences: Experience[];

  /**
   * Whether to display the buttons to edit the experiences.
   */
  isEditing?: boolean;

  /**
   * The function to call when the edit button of an item is pressed.
   */
  onItemEditPress?: (experience: Experience) => void;

  /**
   * The function to call when the delete button of an item is pressed.
   */
  onItemDeletePress?: (experience: Experience) => void;
};

/**
 * Displays the list of experiences.
 * @constructor
 */
const ExperienceList: FC<ExperienceListProps> = ({
  experiences,
  isEditing,
  onItemEditPress,
  onItemDeletePress,
}) => {
  return (
    <View>
      {experiences?.map((experience) => (
        <View key={experience.id} style={styles.itemContainer}>
          <ExperienceItem
            experience={experience}
            isEditing={isEditing}
            onEditPress={onItemEditPress}
            onDeletePress={onItemDeletePress}
          />

          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default ExperienceList;
