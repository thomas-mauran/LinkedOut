import { useLocales } from 'expo-localization';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { JobOffer } from '@/models/entities/jobOffer';

/**
 * The styles for the JobOfferItem component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 6,
    margin: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    marginTop: 'auto',
  },
  item: {
    marginTop: 8,
  },
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    marginBottom: 2,
  },
});

/**
 * The props for the JobOfferItem component.
 */
type JobOfferItemProps = {
  /**
   * The job offer to display.
   */
  jobOffer: JobOffer;
};

/**
 * Displays a job offer.
 * @constructor
 */
const JobOfferItem: FC<JobOfferItemProps> = ({ jobOffer }) => {
  // Hooks
  const locales = useLocales();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View>
          <Text
            variant='labelLarge'
            style={styles.title}
          >{`${jobOffer.title}`}</Text>
          <Text style={styles.item}>{`${jobOffer.description}`}</Text>
        </View>
      </View>

      <View style={[styles.horizontalContainer, styles.item]}>
        <MaterialCommunityIcons
          name='calendar'
          size={24}
          style={[styles.icon, { color: theme.colors.onSurface }]}
        />
        <Text variant='labelLarge'>
          {`${new Date(jobOffer.startDate).toLocaleDateString(
            locales[0].languageTag,
          )} - ${new Date(jobOffer.endDate).toLocaleDateString(
            locales[0].languageTag,
          )}`}
        </Text>
      </View>

      <View style={[styles.horizontalContainer, styles.item]}>
        <MaterialCommunityIcons
          name='map-marker'
          size={24}
          style={[styles.icon, { color: theme.colors.onSurface }]}
        />
        <Text
          variant='labelLarge'
          style={styles.item}
        >{`${jobOffer.geographicArea}`}</Text>
      </View>
    </View>
  );
};

export default JobOfferItem;
