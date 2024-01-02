import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import EmployerEvaluationForm, {
  EmployerEvaluationFormData,
} from '@/components/employer/EmployerEvaluationForm';
import { EmployerEvaluationDto } from '@/models/dtos/employer/EmployerEvaluationDto';
import {
  useGetEmployerQuery,
  usePostEmployerEvaluationMutation,
} from '@/store/api/employer';
import i18n from '@/utils/i18n';

import { MessagingStackParamList } from '../messaging/MessagingNav';

/**
 * The styles for the EmployerEvaluationPage component.
 */
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the EmployerEvaluationPage component.
 */
type EmployerEvaluationPageProps = NativeStackScreenProps<
  MessagingStackParamList,
  'EmployerEvaluation'
>;

/**
 * The parameters for the Employer route.
 */
export type EmployerEvaluationPageParams = {
  /**
   * The ID of the message channel to view.
   */
  id: string;
};

/**
 * Displays the page for a single message channel.
 * @constructor
 */
const EmployerEvaluationPage: FC<EmployerEvaluationPageProps> = ({
  route,
  navigation,
}) => {
  const { id: employerId } = route.params;

  // API calls
  const { data: employer, refetch: refetchEmployer } =
    useGetEmployerQuery(employerId);

  const [postEmployerEvaluation] = usePostEmployerEvaluationMutation();

  // State
  const [formData, setFormData] = useState<EmployerEvaluationFormData>({
    score: 1,
    review: '',
  });

  // Callbacks
  const handleSubmitEvaluation = useCallback(() => {
    const newEvaluation: EmployerEvaluationDto = {
      id: employerId,
      evaluation: {
        score: formData.score,
        review: formData.review,
      },
    };

    postEmployerEvaluation(newEvaluation)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [employerId, formData, navigation, postEmployerEvaluation]);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchEmployer();
    }, [refetchEmployer]),
  );

  if (employer === undefined) {
    return null;
  }

  return (
    <View style={styles.contentContainer}>
      <EmployerEvaluationForm
        employer={employer}
        formData={formData}
        onFormDataUpdate={setFormData}
      />
      <Button mode='contained-tonal' onPress={handleSubmitEvaluation}>
        {i18n.t('employer.sendEvaluation')}
      </Button>
    </View>
  );
};

export default EmployerEvaluationPage;
