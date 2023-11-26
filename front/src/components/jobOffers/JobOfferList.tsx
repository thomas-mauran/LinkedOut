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

type JobOfferListProps = {
  /**
   * The function to call when an item of the jobOffer item is pressed.
   */
  onItemPress?: (jobOffer: JobOffer) => void;
  /**
   * The list of jobOffers to display.
   */
  jobOffers: JobOffer[];
};

const JobOfferList: FC<JobOfferListProps> = ({ onItemPress, jobOffers }) => {
  return (
    <View>
      {jobOffers?.map((jobOffer) => (
        <View key={jobOffer.id}>
          <JobOfferItem onItemPress={onItemPress} jobOffer={jobOffer} />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default JobOfferList;
