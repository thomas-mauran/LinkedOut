import { useLocales } from 'expo-localization';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

import i18n from '@/utils/i18n';

/**
 * The styles for the DatePicker component.
 */
const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateTextContainer: {
    flex: 1,
  },
});

/**
 * The data for the date picker.
 */
type DatePickerProps = {
  /**
   * The date.
   */
  date: Date;

  /**
   * The function to call when the date is updated.
   */
  onDateUpdate: (date: Date) => void;

  /**
   * The text to display.
   */
  text?: string;
};

/**
 * Component for providing a way to pick a date.
 * @constructor
 */
const DatePicker: FC<DatePickerProps> = ({ date, onDateUpdate, text }) => {
  // Hooks
  const locales = useLocales();

  // State
  const [modalVisible, setModalVisible] = useState(false);

  // Callbacks
  const onDatePickerModalConfirm = useCallback<SingleChange>(
    ({ date }) => {
      setModalVisible(false);
      onDateUpdate(date);
    },
    [onDateUpdate],
  );

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateTextContainer}>
        <Text>{text ?? i18n.t('profile.date.singleDate')}</Text>

        <Text>{date.toLocaleDateString(locales[0].languageTag)}</Text>
      </View>

      <Button
        onPress={() => setModalVisible(true)}
        uppercase={false}
        mode='outlined'
      >
        {i18n.t('profile.date.pickDate')}
      </Button>

      <DatePickerModal
        locale={locales[0].regionCode}
        mode='single'
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        date={date}
        onConfirm={onDatePickerModalConfirm}
      />
    </View>
  );
};

export default DatePicker;
