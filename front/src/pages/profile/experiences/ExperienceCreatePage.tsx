import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceForm from '@/components/experiences/ExperienceForm';
import { Experience } from '@/models/types';
import { usePostExperienceMutation } from '@/store/slice/api';

import { ProfileStackParamList } from '../ProfileNav';

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

type ExperienceCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ExperienceCreate'
>;

const ExperienceCreatePage = ({
  route,
  navigation,
}: ExperienceCreatePageProps) => {
  // Hooks

  // Form State
  const [formData, setFormData] = useState({
    jobTitle: '',
    firstLine: '',
    zipCode: '',
    city: '',
    companyName: '',
    startDate: null,
    endDate: null,
  });

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [navigation, formData]);

  // Api calls
  const [postExperience] = usePostExperienceMutation();

  // Methods

  const checkPressed = useCallback(() => {
    const updatedExperience: Partial<Experience> = {
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

    postExperience(updatedExperience)
      .unwrap()
      .then((r) => {
        navigation.goBack();
      });
  }, [formData, postExperience, navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <ExperienceForm formData={formData} setFormData={setFormData} />
      </View>
    </ScrollView>
  );
};

export default ExperienceCreatePage;
