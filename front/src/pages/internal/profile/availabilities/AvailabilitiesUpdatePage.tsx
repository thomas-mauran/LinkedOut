import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Slider from 'react-native-a11y-slider';
import { Appbar, Button, Text, TextInput, useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';

import {
  useGetJobCategoriesQuery,
  usePatchAvailabilitiesMutation,
  usePostAvailabilitiesMutation,
} from '@/store/slice/api';
import { Availability } from '@/store/slice/types';
import i18n from '@/utils/i18n';

import { ProfileStackParamList } from '../../ProfileNav';

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

type AvailabilitiesUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilitiesUpdate'
>;

const AvailabilitiesUpdatePage = ({
  route,
  navigation,
}: AvailabilitiesUpdatePageProps) => {
  // Constants
  const { id, address, startDate, endDate, range, category } =
    route.params as Availability;

  // Hooks
  let [isCreate, setIsCreate] = useState(false);
  const { colors } = useTheme();

  // Form State
  const [formData, setFormData] = useState({
    id,
    firstLine: address?.firstLine,
    zipCode: address?.zipCode,
    city: address?.city,
    startDate,
    endDate,
    range: [range ?? 0],
    categoryId: category?.id,
    category: category?.category,
  });

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${
        isCreate
          ? i18n.t('profile.availabilities.availabilitiesCreate')
          : i18n.t('profile.availabilities.availabilitiesEdit')
      }`, // Change this to your desired title
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [navigation, formData]);

  // To check if we are creating or updating
  useEffect(() => {
    if (id === undefined) {
      setIsCreate(true);
      handleInputChange('startDate', new Date());
      handleInputChange('endDate', new Date());
    }
  }, []);
  // Api calls
  const [patchAvailabilitie] = usePatchAvailabilitiesMutation();
  const [postAvailabilitie] = usePostAvailabilitiesMutation();
  const { data: categories } = useGetJobCategoriesQuery('');

  // Date picker states
  const [dateRange, setDateRange] = React.useState({
    startDate: new Date(startDate ?? new Date()),
    endDate: new Date(endDate ?? new Date()),
  });
  const [open, setOpen] = React.useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

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
      setDateRange({ startDate, endDate });
      handleInputChange('startDate', startDate.toISOString());
      handleInputChange('endDate', endDate.toISOString());
    },
    [setOpen, setDateRange],
  );

  // To save the changes
  const checkPressed = useCallback(() => {
    const updatedAvailabilitie: Availability = {
      id: formData.id ?? null,
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      category: {
        category: formData.category,
        id: formData.categoryId,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      range: formData.range[0],
    };
    if (isCreate === true) {
      postAvailabilitie(updatedAvailabilitie)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    } else {
      patchAvailabilitie(updatedAvailabilitie)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    }
  }, [formData, patchAvailabilitie, navigation]);

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
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onConfirm={onConfirm}
          />
        </View>
        <View style={{ width: '80%', marginTop: 10, marginBottom: 10 }}>
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
        <View
          style={[
            styles.horizontalContainer,
            { width: '80%', marginTop: 20, marginBottom: 20 },
          ]}
        >
          <Text variant='headlineSmall'>
            {i18n.t('profile.availabilities.radiusRange')} {formData.range[0]}{' '}
          </Text>
        </View>
        <Slider
          min={1}
          max={200}
          values={formData.range}
          onChange={(value) => {
            handleInputChange('range', value);
          }}
          style={{ width: '80%' }}
          markerColor={colors.inversePrimary}
          showLabel={false}
        />
      </View>
    </ScrollView>
  );
};

export default AvailabilitiesUpdatePage;
