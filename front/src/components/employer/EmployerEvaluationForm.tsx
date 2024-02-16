import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import StarRatingSelector from '@/components/utils/StarRatingSelector';
import i18n from '@/utils/i18n';

/**
 * The styles for the EmployerEvaluationForm component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 12,
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
   * The data for the form.
   */
  formData: EmployerEvaluationFormData;

  /**
   * The function to call when the form data is updated.
   */
  onFormDataUpdate: (data: EmployerEvaluationFormData) => void;

  /**
   * The function to call when the form is submitted.
   */
  onSubmit: () => void;
};

/**
 * Displays an employer evaluation form.
 * @constructor
 */
const EmployerEvaluationForm: FC<EmployerEvaluationFormProps> = ({
  formData,
  onFormDataUpdate,
  onSubmit,
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
      <Text variant='titleLarge'> {i18n.t('employer.giveAReview')}</Text>
      <StarRatingSelector
        rating={formData.score}
        onStarPress={(value) => handleInputChange('score', value)}
      />

      <TextInput
        label={i18n.t('employer.review')}
        value={formData.review}
        multiline
        numberOfLines={6}
        onChangeText={(value) => handleInputChange('review', value)}
      />

      <Button mode='contained' onPress={onSubmit}>
        {i18n.t('employer.sendEvaluation')}
      </Button>
    </View>
  );
};

export default EmployerEvaluationForm;
