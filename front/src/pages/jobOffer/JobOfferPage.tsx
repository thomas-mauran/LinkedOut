import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';

import JobOfferList from '@/components/jobOffers/JobOfferList';
import { useGetJobOffersQuery } from '@/store/api/jobApiSlice';

import { JobOfferStackParamList } from './JobOfferNav';

/**
 * The props for the JobOffersPage component.
 */
type JobOfferPageProps = NativeStackScreenProps<
  JobOfferStackParamList,
  'JobOffer'
>;

/**
 * Displays the JobOffers page for the current user.
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

  return <JobOfferList jobOffers={jobOffers} />;
};

export default JobOfferPage;
