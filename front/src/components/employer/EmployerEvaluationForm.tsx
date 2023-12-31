import { FC, useCallback } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import StarRatingSelector from '@/components/utils/StarRatingSelector';
import { Employer } from '@/models/entities/employer';
import i18n from '@/utils/i18n';

/**
 * The styles for the EmployerEvaluationForm component.
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
  profilePicture: {
    borderRadius: 48,
    height: 60,
    width: 60,
  },
  textInput: {
    marginVertical: 8,
  },
});

/**
 * The data for the employer evaluation form.
 */
export type EmployerEvaluationFormData = {
  score: number;
  review: string;
};

/**
 * The props for the EmployerEvaluationForm component.
 */
type EmployerEvaluationFormProps = {
  /**
   * The employer to evaluate.
   */
  employer: Employer;

  /**
   * The data for the form.
   */
  formData: EmployerEvaluationFormData;

  /**
   * The function to call when the form data is updated.
   */
  onFormDataUpdate: (data: EmployerEvaluationFormData) => void;
};

/**
 * Displays an employer evaluation form.
 * @constructor
 */
const EmployerEvaluationForm: FC<EmployerEvaluationFormProps> = ({
  employer,
  formData,
  onFormDataUpdate,
}) => {
  // Callbacks
  const handleInputChange = useCallback(
    (
      key: keyof EmployerEvaluationFormData,
      value: EmployerEvaluationFormData[typeof key],
    ) => {
      onFormDataUpdate({
        ...formData,
        [key]: value,
      });
    },
    [formData, onFormDataUpdate],
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: employer.picture,
          }}
        />
        <View>
          <Text variant='headlineMedium'>{`${employer.firstName} ${employer.lastName}`}</Text>
        </View>
      </View>
      <Text variant='titleLarge'> {i18n.t('employer.giveAReview')}</Text>
      <StarRatingSelector
        rating={formData.score}
        onStarPress={(value) => handleInputChange('score', value)}
      />
      <TextInput
        label={i18n.t('employer.review')}
        value={formData.review}
        style={styles.textInput}
        multiline
        numberOfLines={6}
        onChangeText={(value) => handleInputChange('review', value)}
      />
    </View>
  );
};

export default EmployerEvaluationForm;
