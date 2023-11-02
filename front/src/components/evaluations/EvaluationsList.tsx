import { useFocusEffect } from '@react-navigation/native';
import React, { FC } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGetEvaluationsQuery } from '@/store/slice/api';
import i18n from '@/utils/i18n';
import { starsIntoArray } from '@/utils/methods';

import ProfilePicturePlaceholder from '../utils/ProfilePicturePlaceholder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  },
});

const EvaluationsList: FC = () => {
  const { data: evaluations, refetch } = useGetEvaluationsQuery('');

  const theme = useTheme();

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant='headlineMedium'>{i18n.t('profile.info.reviews')}</Text>
      {evaluations?.map((evaluation) => (
        <View key={evaluation.id}>
          <View style={styles.horizontalContainer}>
            <ProfilePicturePlaceholder
              username={`${evaluation.employerFirstName}${evaluation.employerLastName}`}
            />
            <View>
              <Text>
                {`${evaluation.employerFirstName} ${evaluation.employerLastName}`}
              </Text>
              <FlatList
                data={starsIntoArray(evaluation?.score)}
                horizontal={true}
                renderItem={({ item }) => (
                  <MaterialCommunityIcons
                    name={
                      item === 1
                        ? 'star'
                        : item === 0.5
                        ? 'star-half-full'
                        : 'star-outline'
                    }
                    size={24}
                    style={{ color: theme.colors.onSurface }}
                  />
                )}
              />
            </View>
          </View>
          <View>
            <Text>{`"${evaluation.review}"`}</Text>
            <Text>
              {new Date(evaluation.createdAt).toLocaleDateString('en-US')}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default EvaluationsList;
