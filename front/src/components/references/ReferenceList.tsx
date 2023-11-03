import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import ReferenceItem from '@/components/references/ReferenceItem';
import { Reference } from '@/models/types';

/**
 * The styles for the ReferenceList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

/**
 * The props for the ReferenceList component.
 */
type ReferencesListProps = {
  /**
   * The list of references to display.
   */
  references: Reference[];

  /**
   * Whether to display the buttons to edit the references.
   */
  isEditing?: boolean;

  /**
   * The function to call when the edit button of an item is pressed.
   */
  onItemEditPress?: (reference: Reference) => void;

  /**
   * The function to call when the delete button of an item is pressed.
   */
  onItemDeletePress?: (reference: Reference) => void;
};

const ReferenceList: FC<ReferencesListProps> = ({
  references,
  isEditing,
  onItemEditPress,
  onItemDeletePress,
}) => {
  return (
    <View>
      {references?.map((reference) => (
        <View key={reference.id}>
          <ReferenceItem
            reference={reference}
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

export default ReferenceList;
