import * as React from 'react';
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
  divider: {
    marginVertical: 8,
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 8,
  },

  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  textInput: {
    marginVertical: 8,
    width: '80%',
  },

  verticalCenterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallInput: {
    width: '45%',
  },
});

type ExperienceFormProps = {
  formData: any;
  setFormData: any;
};
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  formData,
  setFormData,
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

  const handleInputChange = (key: string, value: any, isDigitOnly = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: isDigitOnly ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  // On confirm of the date picker
  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      handleInputChange('startDate', startDate.toISOString());
      handleInputChange('endDate', endDate.toISOString());
    },
    [setOpen, setRange],
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
            onConfirm={onConfirm}
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
