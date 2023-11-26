import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferList from '@/components/jobOffers/JobOfferList';
import { JobOffer } from '@/models/entities/jobOffer';
import { useGetJobOffersQuery } from '@/store/api/jobApiSlice';

import { JobOfferStackParamList } from './JobOfferNav';

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

type JobOfferListPageProps = NativeStackScreenProps<
  JobOfferStackParamList,
  'JobOfferList'
>;

const JobOfferListPage: FC<JobOfferListPageProps> = ({ navigation }) => {
  const { data: jobOffers, refetch: refetchJobOffers } = useGetJobOffersQuery();

  useFocusEffect(
    useCallback(() => {
      refetchJobOffers();
    }, [refetchJobOffers]),
  );

  const handleJobOfferPress = useCallback(
    (jobOffer: JobOffer) => {
      navigation.navigate('JobOffer', { id: jobOffer.id });
    },
    [navigation],
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
