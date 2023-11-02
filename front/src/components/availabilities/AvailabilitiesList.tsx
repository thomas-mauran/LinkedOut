import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { Availability } from '@/models/types';
import { ProfileStackParamList } from '@/pages/profile/ProfileNav';
import {
  useDeleteAvailabilitiesMutation,
  useGetAvailabilitiesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

interface AvailabilitiesListProps {
  isEditing?: boolean;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const styles = StyleSheet.create({
  editBtnContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  editBtnInline: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  textFieldTitle: {
    marginTop: 5,
  },
});

const AvailabilitiesList: FC<AvailabilitiesListProps> = ({
  isEditing,
  navigation,
}) => {
  const [deleteAvailability] = useDeleteAvailabilitiesMutation();
  const { data: availabilities, refetch } = useGetAvailabilitiesQuery('');

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const editButtonAvailability = useCallback(
    (availability: Partial<Availability>) => {
      navigation.navigate('AvailabilityUpdate', { ...availability });
    },
    [navigation],
  );

  const trashcanButtonAvailability = useCallback(
    (availability: Partial<Availability>) => {
      Alert.alert(
        i18n.t('profile.availabilities.delete'),
        i18n.t('profile.availabilities.deleteConfirm'),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.delete'),
            onPress: () => {
              deleteAvailability(availability.id)
                .unwrap()
                .then(() => {
                  refetch();
                });
            },
          },
        ],
      );
    },
    [deleteAvailability, refetch],
  );

  const createButtonAvailability = useCallback(() => {
    navigation.navigate('AvailabilityCreate');
  }, [navigation]);

  return (
    <View>
      <View>
        <View style={styles.horizontalContainer}>
          <Text variant='titleLarge'>
            {i18n.t('profile.info.availabilities')}
          </Text>
          {isEditing && (
            <View style={styles.editBtnContainer}>
              <IconButton
                icon='plus'
                style={styles.editBtnInline}
                onPress={() => createButtonAvailability()}
              />
            </View>
          )}
        </View>
      </View>

      {availabilities?.map((availability) => (
        <View key={availability.id} style={styles.horizontalContainer}>
          <View>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {availability?.jobCategory.category}
            </Text>
            <Text style={styles.textFieldElement}>
              {new Date(availability.startDate).toLocaleDateString('en-US')} -{' '}
              {new Date(availability.endDate).toLocaleDateString('en-US')}
            </Text>
            <Text style={styles.textFieldElement}>
              {availability?.address.firstLine}, {availability?.address.city},{' '}
              {availability?.address.zipCode}
            </Text>
          </View>
          {isEditing && (
            <View style={styles.horizontalContainer}>
              <IconButton
                icon='pencil'
                style={styles.editBtnInline}
                onPress={() => editButtonAvailability(availability)}
              />
              <IconButton
                icon='trash-can'
                style={styles.editBtnInline}
                onPress={() => trashcanButtonAvailability(availability)}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default AvailabilitiesList;
