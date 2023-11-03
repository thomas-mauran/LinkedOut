import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import ProfilePicturePlaceholder from '@/components/utils/ProfilePicturePlaceholder';
import { Reference } from '@/models/types';

/**
 * The styles for the ReferenceItem component.
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
  textContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
});

/**
 * The props for the ReferenceItem component.
 */
type ReferenceItemProps = {
  /**
   * The reference to display.
   */
  reference: Reference;

  /**
   * Whether to display the buttons to edit the reference.
   */
  isEditing?: boolean;

  /**
   * The function to call when the edit button is pressed.
   */
  onEditPress?: (reference: Reference) => void;

  /**
   * The function to call when the delete button is pressed.
   */
  onDeletePress?: (reference: Reference) => void;
};

/**
 * Displays a reference item.
 * @constructor
 */
const ReferenceItem: FC<ReferenceItemProps> = ({
  reference,
  isEditing,
  onEditPress,
  onDeletePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ProfilePicturePlaceholder
          username={`${reference.firstName}${reference.lastName}`}
        />

        <View>
          <Text>{reference.firstName}</Text>
          <Text>{reference.lastName}</Text>
        </View>
      </View>

      {isEditing && (
        <View style={styles.editionContainer}>
          <IconButton icon='pencil' onPress={() => onEditPress?.(reference)} />

          <IconButton
            icon='trash-can'
            onPress={() => onDeletePress?.(reference)}
          />
        </View>
      )}
    </View>
  );
};

export default ReferenceItem;
