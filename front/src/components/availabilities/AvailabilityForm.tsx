import Slider from '@react-native-community/slider';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import DateRangePicker from '@/components/utils/DateRangePicker';
import { JobCategory } from '@/models/entities/jobCategory';
import i18n from '@/utils/i18n';

/**
 * The styles for the AvailabilityForm component.
 */
const styles = StyleSheet.create({
  cityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cityItem: {
    flex: 1,
  },
  container: {
    gap: 16,
  },
});

/**
 * The data for the availability form.
 */
export type AvailabilityFormData = {
  jobCategoryId: string;
  startDate: string;
  endDate: string;
  addressFirstLine: string;
  zipCode: string;
  city: string;
  range: number;
};

/**
 * The props for the AvailabilityForm component.
 */
type AvailabilityFormProps = {
  /**
   * The job categories.
   */
  jobCategories: JobCategory[];

  /**
   * The data for the form.
   */
  formData: AvailabilityFormData;

  /**
   * The function to call when the form data is updated.
   */
  onFormDataUpdate: (data: AvailabilityFormData) => void;
};

/**
 * Displays the form for creating or updating an availability.
 * @constructor
 */
const AvailabilityForm: FC<AvailabilityFormProps> = ({
  jobCategories,
  formData,
  onFormDataUpdate,
}) => {
  // Hooks
  const theme = useTheme();

  // State
  const [dateRange, setDateRange] = useState({
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
  });

  const [jobCategoryDropdownVisible, setJobCategoryDropdownVisible] =
    useState(false);

  const [rangeText, setRangeText] = useState(formData.range);

  // Callbacks
  const handleInputChange = useCallback(
    (
      key: keyof AvailabilityFormData,
      value: AvailabilityFormData[typeof key],
    ) => {
      if (typeof value === 'string' && key === 'zipCode') {
        value = value.replace(/[^0-9]/g, '');
      }

      onFormDataUpdate({
        ...formData,
        [key]: value,
      });
    },
    [formData, onFormDataUpdate],
  );

  const handleDateRangeUpdate = useCallback(
    (startDate: Date, endDate: Date) => {
      setDateRange({ startDate, endDate });

      onFormDataUpdate({
        ...formData,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    },
    [formData, onFormDataUpdate, setDateRange],
  );

  return (
    <View style={styles.container}>
      <DropDown
        label={'Category'}
        visible={jobCategoryDropdownVisible}
        showDropDown={() => setJobCategoryDropdownVisible(true)}
        onDismiss={() => setJobCategoryDropdownVisible(false)}
        value={formData.jobCategoryId}
        setValue={(value) => handleInputChange('jobCategoryId', value)}
        list={jobCategories.map((category) => ({
          label: category.category,
          value: category.id,
        }))}
      />

      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onDateRangeUpdate={handleDateRangeUpdate}
      />

      <TextInput
        label={i18n.t('profile.address.firstLine')}
        value={formData.addressFirstLine}
        onChangeText={(value) => handleInputChange('addressFirstLine', value)}
      />

      <View style={styles.cityContainer}>
        <TextInput
          label={i18n.t('profile.address.zipCode')}
          value={formData.zipCode}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('zipCode', value)}
          keyboardType={'numeric'}
        />

        <TextInput
          label={i18n.t('profile.address.city')}
          value={formData.city}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('city', value)}
        />
      </View>

      <View>
        <Text variant='headlineSmall'>
          {i18n.t('profile.availabilities.radiusRange', {
            range: rangeText,
          })}
        </Text>

        <Slider
          minimumValue={1}
          maximumValue={200}
          step={1}
          minimumTrackTintColor={theme.colors.primary}
          value={formData.range}
          onValueChange={setRangeText}
          onSlidingComplete={(value) => {
            handleInputChange('range', value);
            setRangeText(value);
          }}
        />
      </View>
    </View>
  );
};

export default AvailabilityForm;
