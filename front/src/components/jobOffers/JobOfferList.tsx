import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { JobOffer } from '@/models/entities/jobOffer';

import JobOfferItem from './JobOfferItem';

/**
 * The styles for the JobOfferList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

/**
 * The props for the JobOfferList component.
 */
type JobOfferProps = {
  /**
   * The job offers to display.
   */
  jobOffers: JobOffer[];
};

/**
 * Displays a list of job offers.
 * @constructor
 */
const JobOfferList: FC<JobOfferProps> = ({ jobOffers }) => {
  return (
    <View>
      {jobOffers?.map((jobOffer) => (
        <View key={jobOffer.id}>
          <JobOfferItem jobOffer={jobOffer} />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default JobOfferList;
