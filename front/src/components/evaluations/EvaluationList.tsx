import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import EvaluationItem from '@/components/evaluations/EvaluationItem';
import { Evaluation } from '@/models/types';

/**
 * The styles for the EvaluationList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

/**
 * The props for the EvaluationList component.
 */
type EvaluationListProps = {
  /**
   * The list of evaluations to display.
   */
  evaluations: Evaluation[];
};

/**
 * Displays the list of reviews for the current user.
 * @constructor
 */
const EvaluationList: FC<EvaluationListProps> = ({ evaluations }) => {
  return (
    <View>
      {evaluations?.map((evaluation) => (
        <View key={evaluation.id}>
          <EvaluationItem evaluation={evaluation} />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default EvaluationList;
