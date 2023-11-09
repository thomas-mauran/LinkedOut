import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import AvailabilityItem from '@/components/availabilities/AvailabilityItem';
import { Availability } from '@/models/entities/availability';
import i18n from '@/utils/i18n';

/**
 * The styles for the AvailabilityList component.
 */
const styles = StyleSheet.create({
  addButton: {
    marginLeft: 'auto',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

/**
 * The props for the AvailabilityList component.
 */
type AvailabilityListProps = {
  /**
   * The list of availabilities to display.
   */
  availabilities: Availability[];

  /**
   * Whether to display the buttons to edit the availabilities.
   */
  isEditing?: boolean;

  /**
   * The function to call when the create button is pressed.
   */
  onCreatePress?: () => void;

  /**
   * The function to call when the edit button of an item is pressed.
   */
  onItemEditPress?: (availability: Availability) => void;

  /**
   * The function to call when the delete button of an item is pressed.
   */

  onItemDeletePress?: (availability: Availability) => void;
};

/**
 * Displays a list of availabilities for a user.
 * @constructor
 */
const AvailabilityList: FC<AvailabilityListProps> = ({
  availabilities,
  isEditing,
  onCreatePress,
  onItemEditPress,
  onItemDeletePress,
}) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text variant='headlineMedium'>
          {i18n.t('profile.info.availabilities')}
        </Text>

        {isEditing && (
          <IconButton
            icon='plus'
            style={styles.addButton}
            onPress={onCreatePress}
          />
        )}
      </View>

      {availabilities?.map((availability) => (
        <AvailabilityItem
          key={availability.id}
          availability={availability}
          isEditing={isEditing}
          onEditPress={onItemEditPress}
          onDeletePress={onItemDeletePress}
        />
      ))}
    </View>
  );
};

export default AvailabilityList;
