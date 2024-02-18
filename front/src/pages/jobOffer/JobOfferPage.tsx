import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import JobOfferContent from '@/components/jobOffers/JobOfferContent';
import { Message } from '@/models/entities/message';
import { useGetJobOfferQuery } from '@/store/api/jobOfferApiSlice';

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
export type JobOfferPageParams = {
  /**
   * The ID of the job offer to view.
   */
  id: string;
};

/**
 * Displays the page for a single job offer.
 * @constructor
 */
const JobOfferPage: FC<JobOfferPageProps> = ({ navigation, route }) => {
  // Route params
  const { id: jobOfferId } = route.params;

  // API calls
  const { data: jobOffer } = useGetJobOfferQuery(jobOfferId);

  // Callbacks
  const handleMessageSent = useCallback(
    (message: Message) => {
      navigation.navigate('EmployerMessageChannel', { id: message.channelId });
    },
    [navigation],
  );

  const handleEmployerInfoClick = useCallback(() => {
    navigation.navigate('OfferEmployerEvaluation', {
      id: jobOffer?.employerId,
    });
  }, [jobOffer, navigation]);

  if (jobOffer === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <JobOfferContent
        jobOffer={jobOffer}
        onMessageSent={handleMessageSent}
        onEmployerInfoClick={handleEmployerInfoClick}
      />
    </ScrollView>
  );
};

export default JobOfferPage;
