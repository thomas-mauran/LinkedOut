import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { JobOffer } from '@/models/entities/jobOffer';

import JobOfferItem from './JobOfferItem';

/**
 * The styles for the JobOfferPage component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
});

/**
 * The props for the JobOffer component.
 */
type JobOfferProps = {
  /**
   * The jobOffers to display.
   */
  jobOffers: JobOffer[];
};

/**
 * Displays the jobOffers of a user.
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
