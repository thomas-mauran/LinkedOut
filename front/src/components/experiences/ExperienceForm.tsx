import * as React from 'react';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import i18n from '@/utils/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '80%',
  },
  smallInput: {
    width: '45%',
  },
  textInput: {
    marginVertical: 8,
    width: '80%',
  },
  verticalCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export type ExperienceFormData = {
  jobTitle: string;
  startDate: string;
  endDate: string;
  companyName: string;
  firstLine: string;
  zipCode: string;
  city: string;
};

type ExperienceFormProps = {
  formData: ExperienceFormData;
  onFormDataUpdate: (data: ExperienceFormData) => void;
};

const ExperienceForm: FC<ExperienceFormProps> = ({
  formData,
  onFormDataUpdate,
}) => {
  // Hooks

  // Api calls

  // Date picker states
  const [range, setRange] = React.useState({
    startDate: new Date(formData.startDate ?? new Date()),
    endDate: new Date(formData.endDate ?? new Date()),
  });

  const [open, setOpen] = React.useState(false);

  // Methods
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleInputChange = useCallback(
    (
      key: keyof ExperienceFormData,
      value: ExperienceFormData[typeof key],
      isDigitOnly = false,
    ) => {
      if (typeof value === 'string' && isDigitOnly) {
        value = value.replace(/[^0-9]/g, '');
      }

      onFormDataUpdate({
        ...formData,
        [key]: value,
      });
    },
    [formData, onFormDataUpdate],
  );

  // On confirm of the date picker
  const onDatePickerConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });

      handleInputChange('startDate', startDate.toISOString());
      handleInputChange('endDate', endDate.toISOString());
    },
    [handleInputChange, setOpen, setRange],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <TextInput
          label={i18n.t('profile.job.jobTitle')}
          value={formData.jobTitle || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('jobTitle', value)}
        />
        <View style={styles.horizontalContainer}>
          <View>
            <Text>{i18n.t('profile.date.dateRange')}</Text>
            <Text>
              {`${new Date(range.startDate).toLocaleDateString(
                'en-US',
              )} - ${new Date(range.endDate).toLocaleDateString('en-US')}`}
            </Text>
          </View>
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode='outlined'
          >
            {i18n.t('profile.date.pickRange')}
          </Button>
          <DatePickerModal
            locale='en'
            mode='range'
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onDatePickerConfirm}
          />
        </View>
        <TextInput
          label={i18n.t('profile.company.companyName')}
          value={formData.companyName || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('companyName', value)}
        />
        <TextInput
          label={i18n.t('profile.address.firstLine')}
          value={formData.firstLine || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('firstLine', value)}
        />
        <View style={styles.horizontalContainer}>
          <TextInput
            label={i18n.t('profile.address.zipCode')}
            value={formData.zipCode || ''}
            style={styles.smallInput}
            onChangeText={(value) => handleInputChange('zipCode', value, true)}
          />
          <TextInput
            label={i18n.t('profile.address.city')}
            value={formData.city || ''}
            style={styles.smallInput}
            onChangeText={(value) => handleInputChange('city', value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ExperienceForm;
