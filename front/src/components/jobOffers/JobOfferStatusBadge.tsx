import { FC } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { JobOfferStatus } from '@/models/entities/jobOffer';
import i18n from '@/utils/i18n';
import { DarkBadgeColorPalette, LightBadgeColorPalette } from '@/utils/theme';

/**
 * The styles for the JobOfferStatusBadge component.
 */
const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  horizontalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});

/**
 * Props for the JobOfferStatusBadge component.
 */
type JobOfferStatusBadgeProps = {
  /**
   * The application status to display.
   */
  status: JobOfferStatus;
};

/**
 * Small badge for displaying the application status of a job offer.
 * @constructor
 */
const JobOfferStatusBadge: FC<JobOfferStatusBadgeProps> = ({
  status,
}: {
  status: JobOfferStatus;
}) => {
  // Get the correct color palette
  const colorScheme = useColorScheme();
  const colorPalette =
    colorScheme === 'dark' ? DarkBadgeColorPalette : LightBadgeColorPalette;

  // Render nothing if the offer has not been applied to
  if (status === JobOfferStatus.NOT_APPLIED) {
    return null;
  }

  switch (status) {
    case JobOfferStatus.APPLIED:
      return (
        <View
          style={[
            styles.badge,
            styles.horizontalContainer,
            {
              backgroundColor: colorPalette.orange.backgroundColor,
            },
          ]}
        >
          <MaterialCommunityIcons
            name='clock-outline'
            size={20}
            style={{ color: colorPalette.orange.textColor }}
          />
          <Text style={{ color: colorPalette.orange.textColor }}>
            {i18n.t('jobOffer.status.pending')}
          </Text>
        </View>
      );
    case JobOfferStatus.ACCEPTED:
      return (
        <View
          style={[
            styles.badge,
            styles.horizontalContainer,
            {
              backgroundColor: colorPalette.green.backgroundColor,
            },
          ]}
        >
          <MaterialCommunityIcons
            name='check'
            size={20}
            style={{ color: colorPalette.green.textColor }}
          />
          <Text style={{ color: colorPalette.green.textColor }}>
            {i18n.t('jobOffer.status.accepted')}
          </Text>
        </View>
      );
    case JobOfferStatus.REJECTED:
      return (
        <View
          style={[
            styles.badge,
            styles.horizontalContainer,
            {
              backgroundColor: colorPalette.red.backgroundColor,
            },
          ]}
        >
          <MaterialCommunityIcons
            name='close-circle-outline'
            size={20}
            style={{ color: colorPalette.red.textColor }}
          />
          <Text style={{ color: colorPalette.red.textColor }}>
            {i18n.t('jobOffer.status.rejected')}
          </Text>
        </View>
      );
  }
};

export default JobOfferStatusBadge;
