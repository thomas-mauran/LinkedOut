import { useLocales } from 'expo-localization';
import { FC, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { JobOffer, JobOfferStatus } from '@/models/entities/jobOffer';
import { usePostApplyJobOfferMutation } from '@/store/api/jobOfferApiSlice';
import i18n from '@/utils/i18n';

/**
 * The styles for the JobOfferContent component.
 */
const styles = StyleSheet.create({
  button: {
    width: 200,
  },
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
  verticalCentered: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});

/**
 * The props for the JobOfferContent component.
 */
type JobOfferContentProps = {
  /**
   * The job offer to display.
   */
  jobOffer: JobOffer;
};

/**
 * Displays the details about a job offer.
 * @constructor
 */
const JobOfferContent: FC<JobOfferContentProps> = ({ jobOffer }) => {
  // API calls
  const [applyToJobOffer] = usePostApplyJobOfferMutation();

  // Hooks
  const locales = useLocales();
  const theme = useTheme();

  // Callbacks
  const handleApplyToJobOffer = useCallback(
    (jobOffer: JobOffer) => {
      Alert.alert(
        i18n.t('jobOffer.apply.applyTitle'),
        i18n.t('jobOffer.apply.applyConfirm'),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.confirm'),
            onPress: () => applyToJobOffer(jobOffer.id),
          },
        ],
      );
    },
    [applyToJobOffer],
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text variant='titleLarge'>{`${jobOffer.title}`}</Text>
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

      <Text>{`${jobOffer.description}`}</Text>

      {jobOffer.status === JobOfferStatus.NOT_APPLIED && (
        <View style={styles.verticalCentered}>
          <Button
            mode={'contained-tonal'}
            style={styles.button}
            onPress={() => handleApplyToJobOffer(jobOffer)}
          >
            {i18n.t('jobOffer.apply.apply')}
          </Button>
        </View>
      )}
    </View>
  );
};

export default JobOfferContent;
