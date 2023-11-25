import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferList from '@/components/jobOffers/JobOfferList';
import { useGetJobOffersQuery } from '@/store/api/jobApiSlice';

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
 * Displays the page of job offers for the current user.
 * @constructor
 */
const JobOfferPage: FC<JobOfferPageProps> = () => {
  // API calls
  const { data: jobOffers, refetch: refetchJobOffers } = useGetJobOffersQuery();

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchJobOffers();
    }, [refetchJobOffers]),
  );

  if (jobOffers === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <JobOfferList jobOffers={jobOffers} />
    </ScrollView>
  );
};

export default JobOfferPage;
