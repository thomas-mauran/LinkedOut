import { useLocales } from 'expo-localization';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ProfilePicturePlaceholder from '@/components/utils/ProfilePicturePlaceholder';
import { Evaluation } from '@/models/entities/evaluation';

import StarRatingSelector from '../utils/StarRatingSelector';

/**
 * The styles for the EvaluationItem component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  reviewText: {
    fontStyle: 'italic',
  },
});

/**
 * The props for the EvaluationItem component.
 */
type EvaluationItemProps = {
  /**
   * The evaluation to display.
   */
  evaluation: Evaluation;
};

/**
 * Displays an evaluation item.
 * @constructor
 */
const EvaluationItem: FC<EvaluationItemProps> = ({ evaluation }) => {
  // Hooks
  const locales = useLocales();

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <ProfilePicturePlaceholder
          username={`${evaluation.employerFirstName}${evaluation.employerLastName}`}
        />

        <View>
          <Text>
            {`${evaluation.employerFirstName} ${evaluation.employerLastName}`}
          </Text>

          <StarRatingSelector editable={false} rating={evaluation.score} />
        </View>
      </View>

      <Text style={styles.reviewText}>{`"${evaluation.review}"`}</Text>

      <Text>
        {new Date(evaluation.createdAt).toLocaleDateString(
          locales[0].languageTag,
        )}
      </Text>
    </View>
  );
};

export default EvaluationItem;
