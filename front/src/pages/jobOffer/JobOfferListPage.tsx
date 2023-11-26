import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferList from '@/components/jobOffers/JobOfferList';
import { JobOffer } from '@/models/entities/jobOffer';
import { useGetJobOffersQuery } from '@/store/api/jobOfferApiSlice';

import { JobOfferStackParamList } from './JobOfferNav';

/**
 * The styles for the JobOfferListPage component.
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
 * The props for the JobOfferListPage component.
 */
type JobOfferListPageProps = NativeStackScreenProps<
  JobOfferStackParamList,
  'JobOfferList'
>;

/**
 * Displays the page of job offers for the current user.
 * @constructor
 */
const JobOfferListPage: FC<JobOfferListPageProps> = ({ navigation }) => {
  // API calls
  const { data: jobOffers, refetch: refetchJobOffers } = useGetJobOffersQuery();

  // Callbacks
  const handleJobOfferPress = useCallback(
    (jobOffer: JobOffer) => {
      navigation.navigate('JobOffer', { id: jobOffer.id });
    },
    [navigation],
  );

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
      <JobOfferList onItemPress={handleJobOfferPress} jobOffers={jobOffers} />
    </ScrollView>
  );
};

export default JobOfferListPage;
