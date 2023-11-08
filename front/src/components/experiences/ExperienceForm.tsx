import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import DateRangePicker from '@/components/utils/DateRangePicker';
import i18n from '@/utils/i18n';
import { Job } from '@/models/entities/job';

/**
 * The styles for the ExperienceForm component.
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
 * The data for the experience form.
 */
export type ExperienceFormData = {
  jobId: string;
  startDate: string;
  endDate: string;
  companyName: string;
  firstLine: string;
  zipCode: string;
  city: string;
};

/**
 * The props for the ExperienceForm component.
 */
type ExperienceFormProps = {
  /**
 * The job categories.
 */
  jobs: Job[];
  /**
   * The data for the form.
   */
  formData: ExperienceFormData;

  /**
   * The function to call when the form data is updated.
   */
  onFormDataUpdate: (data: ExperienceFormData) => void;
};

/**
 * The form for creating or updating an experience.
 * @constructor
 */
const ExperienceForm: FC<ExperienceFormProps> = ({
  jobs,
  formData,
  onFormDataUpdate,
}) => {
  // State
  const [dateRange, setDateRange] = useState({
    startDate: new Date(formData.startDate ?? new Date()),
    endDate: new Date(formData.endDate ?? new Date()),
  });
  const [jobCategoryDropdownVisible, setJobCategoryDropdownVisible] =
  useState(false);

  // Callbacks
  const handleInputChange = useCallback(
    (key: keyof ExperienceFormData, value: ExperienceFormData[typeof key]) => {
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
        label={i18n.t('profile.job.job')}
        visible={jobCategoryDropdownVisible}
        showDropDown={() => setJobCategoryDropdownVisible(true)}
        onDismiss={() => setJobCategoryDropdownVisible(false)}
        value={formData.jobId}
        setValue={(value) => handleInputChange('jobId', value)}
        list={jobs.map((job) => ({
          label: job.title,
          value: job.id,
        }))}
      />


      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onDateRangeUpdate={handleDateRangeUpdate}
      />

      <TextInput
        label={i18n.t('profile.company.companyName')}
        value={formData.companyName}
        onChangeText={(value) => handleInputChange('companyName', value)}
      />

      <TextInput
        label={i18n.t('profile.address.firstLine')}
        value={formData.firstLine}
        onChangeText={(value) => handleInputChange('firstLine', value)}
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
    </View>
  );
};

export default ExperienceForm;
