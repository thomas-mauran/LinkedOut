import { useLocales } from 'expo-localization';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { RangeChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

import i18n from '@/utils/i18n';

/**
 * The styles for the DateRangePicker component.
 */
const styles = StyleSheet.create({
  dateRangeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateRangeTextContainer: {
    flex: 1,
  },
});

/**
 * The data for the date range picker.
 */
type DateRangePickerProps = {
  /**
   * The start date.
   */
  startDate: Date;

  /**
   * The end date.
   */
  endDate: Date;

  /**
   * The function to call when the date range is updated.
   */
  onDateRangeUpdate: (startDate: Date, endDate: Date) => void;
};

/**
 * Component for providing a way to pick a date range.
 * @constructor
 */
const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateRangeUpdate,
}) => {
  // Hooks
  const locales = useLocales();

  // State
  const [modalVisible, setModalVisible] = useState(false);

  // Callbacks
  const onDatePickerModalConfirm = useCallback<RangeChange>(
    ({ startDate, endDate }) => {
      setModalVisible(false);
      onDateRangeUpdate(startDate, endDate);
    },
    [onDateRangeUpdate],
  );

  return (
    <View style={styles.dateRangeContainer}>
      <View style={styles.dateRangeTextContainer}>
        <Text>{i18n.t('profile.date.dateRange')}</Text>

        <Text>
          {`${startDate.toLocaleDateString(
            locales[0].languageTag,
          )} - ${endDate.toLocaleDateString(locales[0].languageTag)}`}
        </Text>
      </View>

      <Button
        onPress={() => setModalVisible(true)}
        uppercase={false}
        mode='outlined'
      >
        {i18n.t('profile.date.pickRange')}
      </Button>

      <DatePickerModal
        locale={locales[0].regionCode}
        mode='range'
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        startDate={startDate}
        endDate={endDate}
        onConfirm={onDatePickerModalConfirm}
      />
    </View>
  );
};

export default DateRangePicker;
