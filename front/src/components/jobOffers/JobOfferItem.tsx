import { useLocales } from 'expo-localization';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { JobOffer } from '@/models/entities/jobOffer';

/**
 * The styles for the JobOfferItem component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionContainer: {
    gap: 8,
  },
});

/**
 * The props for the JobOfferItem component.
 */
type JobOfferItemProps = {
  /**
   * The function to call when an a jobOffer is pressed.
   */
  onItemPress?: (jobOffer: JobOffer) => void;

  /**
   * The job offer to display.
   */
  jobOffer: JobOffer;
};

/**
 * Displays a job offer.
 * @constructor
 */
const JobOfferItem: FC<JobOfferItemProps> = ({ onItemPress, jobOffer }) => {
  // Hooks
  const locales = useLocales();
  const theme = useTheme();

  return (
    <TouchableRipple onPress={() => onItemPress?.(jobOffer)}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text variant='titleLarge'>{`${jobOffer.title}`}</Text>
          <Text>{`${jobOffer.description}`}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <MaterialCommunityIcons
              name='calendar'
              size={24}
              style={{ color: theme.colors.onSurface }}
            />
            <Text variant='labelLarge'>
              {`${new Date(jobOffer.startDate).toLocaleDateString(
                locales[0].languageTag,
              )} - ${new Date(jobOffer.endDate).toLocaleDateString(
                locales[0].languageTag,
              )}`}
            </Text>
          </View>

          <View style={styles.horizontalContainer}>
            <MaterialCommunityIcons
              name='map-marker'
              size={24}
              style={{ color: theme.colors.onSurface }}
            />
            <Text variant='labelLarge'>{`${jobOffer.geographicArea}`}</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default JobOfferItem;
