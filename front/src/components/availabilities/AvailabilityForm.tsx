import { FC, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Slider from 'react-native-a11y-slider';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';

import { useGetJobCategoriesQuery } from '@/store/slice/api';
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

export type AvailabilityFormData = {
  startDate: string;
  endDate: string;
  categoryId: number;
  category: string;
  firstLine: string;
  zipCode: string;
  city: string;
  range: number[];
};

type AvailabilityFormProps = {
  formData: AvailabilityFormData;
  onFormDataUpdate: (data: AvailabilityFormData) => void;
};

const AvailabilityForm: FC<AvailabilityFormProps> = ({
  formData,
  onFormDataUpdate,
}) => {
  // Hooks
  const { colors } = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);

  // Api calls
  const { data: categories } = useGetJobCategoriesQuery('');

  // Date picker states
  const [range, setRange] = useState({
    startDate: new Date(formData.startDate ?? new Date()),
    endDate: new Date(formData.endDate ?? new Date()),
  });

  const [open, setOpen] = useState(false);

  // Methods
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleInputChange = useCallback(
    (
      key: keyof AvailabilityFormData,
      value: AvailabilityFormData[typeof key],
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
  const onDatePickerConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });

      handleInputChange('startDate', startDate.toISOString());
      handleInputChange('endDate', endDate.toISOString());
    },
    [handleInputChange, setOpen, setRange],
  );

  const dropdownChange = (value: number) => {
    const category = categories?.find((c) => c.id === value);
    handleInputChange('categoryId', value);
    handleInputChange('category', category?.category);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <View style={styles.horizontalContainer}>
          <View>
            <Text>{i18n.t('profile.date.dateRange')}</Text>
            <Text>
              {`${new Date(formData.startDate).toLocaleDateString(
                'en-US',
              )} - ${new Date(formData.endDate).toLocaleDateString('en-US')}`}
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
        <View>
          {categories && (
            <DropDown
              label={'Category'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={formData.categoryId}
              setValue={(value) => {
                dropdownChange(value);
              }}
              list={categories?.map((category) => ({
                label: category.category,
                value: category.id,
              }))}
            />
          )}
        </View>
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
        <View style={styles.horizontalContainer}>
          <Text variant='headlineSmall'>
            {i18n.t('profile.availabilities.radiusRange', {
              range: formData.range[0],
            })}
          </Text>
        </View>
        <Slider
          min={1}
          max={200}
          values={formData.range}
          onChange={(value: number[]) => {
            handleInputChange('range', value);
          }}
          markerColor={colors.inversePrimary}
          showLabel={false}
        />
      </View>
    </ScrollView>
  );
};

export default AvailabilityForm;
