import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferContent from '@/components/jobOffers/JobOfferContent';
import { useGetJobOfferQuery } from '@/store/api/jobApiSlice';

import { JobOfferStackParamList } from './JobOfferNav';

/**
 * The styles for the JobOfferPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the JobOfferPage component.
 */
type JobOfferPageProps = NativeStackScreenProps<
  JobOfferStackParamList,
  'JobOffer'
>;

/**
 * The parameters for the JobOffer route.
 */
export type JobOfferViewPageParams = {
  /**
   * The ID of the availability to update.
   */
  id: string;
};

/**
 * Displays the page of job offers for the current user.
 * @constructor
 */
const JobOfferPage: FC<JobOfferPageProps> = ({ route }) => {
  const { id: jobOfferId } = route.params;

  // API calls
  const { data: jobOffer } = useGetJobOfferQuery(jobOfferId);

  if (jobOffer === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <JobOfferContent jobOffer={jobOffer} />
    </ScrollView>
  );
};

export default JobOfferPage;
