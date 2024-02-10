import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferList from '@/components/jobOffers/JobOfferList';
import { JobOffer } from '@/models/entities/jobOffer';
import { useGetAppliedJobOffersQuery } from '@/store/api/jobOfferApiSlice';

import { JobOfferApplicationStackParamList } from './JobOfferApplicationNav';

/**
 * The styles for the JobOfferApplicationPage component.
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
 * The props for the JobOfferApplicationPage component.
 */
type JobOfferApplicationPageProps = NativeStackScreenProps<
  JobOfferApplicationStackParamList,
  'JobOfferApplicationList'
>;

/**
 * Displays the page of job offers for the current user.
 * @constructor
 */
const JobOfferApplicationPage: FC<JobOfferApplicationPageProps> = ({
  navigation,
}) => {
  // API calls
  const { data: jobOffersApplied, refetch: refetchJobOffersApplied } =
    useGetAppliedJobOffersQuery();

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
      refetchJobOffersApplied();
    }, [refetchJobOffersApplied]),
  );

  if (jobOffersApplied === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <JobOfferList
        onItemPress={handleJobOfferPress}
        jobOffers={jobOffersApplied}
      />
    </ScrollView>
  );
};

export default JobOfferApplicationPage;
