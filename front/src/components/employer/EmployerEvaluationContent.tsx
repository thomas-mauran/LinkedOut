import { FC, useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import EmployerEvaluationForm, {
  EmployerEvaluationFormData,
} from '@/components/employer/EmployerEvaluationForm';
import { CreateEmployerEvaluationDto } from '@/models/dtos/employer/createEmployerEvaluationDto';
import { Employer } from '@/models/entities/employer';
import { EmployerEvaluation } from '@/models/entities/employerEvaluation';
import {
  useDeleteEmployerEvaluationMutation,
  usePostEmployerEvaluationMutation,
} from '@/store/api/employerApiSlice';
import i18n from '@/utils/i18n';

/**
 * The styles for the EmployerEvaluationContent component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
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
});

/**
 * The props for the EmployerEvaluationContent component.
 */
type EmployerEvaluationContentProps = {
  /**
   * The employer to evaluate.
   */
  employer: Employer;

  /**
   * The evaluation that was already given.
   */
  employerEvaluation?: EmployerEvaluation;
};

/**
 * Displays the content for an employer evaluation page.
 * @constructor
 */
export const EmployerEvaluationContent: FC<EmployerEvaluationContentProps> = ({
  employer,
  employerEvaluation,
}) => {
  // API calls
  const [postEmployerEvaluation] = usePostEmployerEvaluationMutation();
  const [deleteEmployerEvaluation] = useDeleteEmployerEvaluationMutation();

  // State
  const [formData, setFormData] = useState<EmployerEvaluationFormData>({
    score: employerEvaluation?.score ?? 1,
    review: employerEvaluation?.review ?? '',
  });

  // Callbacks
  const handleSubmitEvaluation = useCallback(() => {
    const newEvaluation: CreateEmployerEvaluationDto = {
      id: employer.id,
      evaluation: {
        score: formData.score,
        review: formData.review,
      },
    };

    postEmployerEvaluation(newEvaluation);
  }, [employer.id, formData.review, formData.score, postEmployerEvaluation]);

  const handleDeleteEvaluation = useCallback(() => {
    Alert.alert(
      i18n.t('employer.deleteEvaluation.title'),
      i18n.t('employer.deleteEvaluation.message'),
      [
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('common.delete'),
          onPress: () => {
            deleteEmployerEvaluation(employer.id);
            setFormData({ score: 1, review: '' });
          },
          style: 'destructive',
        },
      ],
    );
  }, [deleteEmployerEvaluation, employer.id]);

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

      <EmployerEvaluationForm
        formData={formData}
        onFormDataUpdate={setFormData}
        onSubmit={handleSubmitEvaluation}
      />

      <Button mode='contained-tonal' onPress={handleDeleteEvaluation}>
        {i18n.t('employer.deleteEvaluation.button')}
      </Button>
    </View>
  );
};

export default EmployerEvaluationContent;
