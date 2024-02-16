import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import EmployerEvaluationContent from '@/components/employer/EmployerEvaluationContent';
import {
  useGetEmployerEvaluationQuery,
  useGetEmployerQuery,
} from '@/store/api/employerApiSlice';

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
 * Displays the page for an employer.
 * @constructor
 */
const EmployerEvaluationPage: FC<EmployerEvaluationPageProps> = ({ route }) => {
  // Route params
  const { id: employerId } = route.params;

  // API calls
  const { data: employer, refetch: refetchEmployer } =
    useGetEmployerQuery(employerId);

  const {
    data: employerEvaluation,
    refetch: refetchEmployerEvaluation,
    isError: hasEmployerEvaluationErrored,
  } = useGetEmployerEvaluationQuery(employerId);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchEmployer();
      refetchEmployerEvaluation();
    }, [refetchEmployer, refetchEmployerEvaluation]),
  );

  if (
    employer === undefined ||
    (employerEvaluation === undefined && !hasEmployerEvaluationErrored)
  ) {
    return null;
  }

  return (
    <View style={styles.contentContainer}>
      <EmployerEvaluationContent
        employer={employer}
        employerEvaluation={employerEvaluation}
      />
    </View>
  );
};

export default EmployerEvaluationPage;
