import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import {
  usePatchExperienceMutation,
  usePostExperienceMutation,
} from '@/store/slice/api';
import { Experience } from '@/store/slice/types';
import i18n from '@/utils/i18n';

import { InternalProfileStackParamList } from '../../InternalProfileNav';

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

type ExperiencesUpdatePageProps = NativeStackScreenProps<
  InternalProfileStackParamList,
  'ExperiencesUpdate'
>;

const ExperiencesUpdatePage = ({
  route,
  navigation,
}: ExperiencesUpdatePageProps) => {
  // Constants
  const { id, company, job, address, startDate, endDate } =
    route.params as Experience;

  let [isCreate, setIsCreate] = useState(false);

  // Hooks

  // Form State
  const [formData, setFormData] = useState({
    id,
    jobTitle: job?.title,
    firstLine: address?.firstLine,
    zipCode: address?.zipCode,
    city: address?.city,
    companyName: company?.name,
    startDate,
    endDate,
  });

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${
        isCreate
          ? i18n.t('profile.experience.experienceCreate')
          : i18n.t('profile.experience.experienceEdit')
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
  const [patchExperience] = usePatchExperienceMutation();
  const [postExperience] = usePostExperienceMutation();

  // Date picker states
  const [range, setRange] = React.useState({
    startDate: new Date(startDate ?? new Date()),
    endDate: new Date(endDate ?? new Date()),
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

  // To save the changes
  const checkPressed = useCallback(() => {
    const updatedExperience: Experience = {
      id: formData.id ?? null,
      company: {
        name: formData.companyName,
      },
      job: {
        title: formData.jobTitle,
      },
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    if (isCreate === true) {
      postExperience(updatedExperience)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    } else {
      patchExperience(updatedExperience)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    }
  }, [formData, patchExperience, navigation]);

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

export default ExperiencesUpdatePage;
