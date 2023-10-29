import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { Availability } from '@/models/types';
import {
  useDeleteAvailabilitiesMutation,
  useGetAvailabilitiesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

interface AvailabilitiesListProps {
  isEditing?: boolean;
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

const AvailabilitiesList: React.FC<
  AvailabilitiesListProps & { navigation: any }
> = ({ isEditing, navigation }) => {
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
    [navigation, availabilities],
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
            onPress: () => handleDelete(availability),
          },
        ],
      );
    },
    [],
  );

  const handleDelete = (availability: Partial<Availability>) => {
    deleteAvailability(availability.id)
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  const createButtonAvailability = useCallback(() => {
    navigation.navigate('AvailabilityCreate');
  }, [navigation]);

  return (
    <View>
      <View>
        {/* Rest of your code remains unchanged */}
        <View style={[styles.horizontalContainer, { width: '100%' }]}>
          <Text variant='titleLarge' style={{ marginBottom: 5, marginTop: 10 }}>
            {i18n.t('profile.info.availabilities')}
          </Text>
          {isEditing && (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <IconButton
                icon='plus'
                style={[styles.editBtnInline]}
                onPress={() => createButtonAvailability()}
              />
            </View>
          )}
        </View>
      </View>

      {availabilities?.map((availability) => (
        <View key={availability.id} style={styles.horizontalContainer}>
          <View style={{ width: '80%' }}>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {availability?.category.category}
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
            <View
              style={[
                styles.horizontalContainer,
                {
                  justifyContent: 'space-around',
                  width: '20%',
                },
              ]}
            >
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
