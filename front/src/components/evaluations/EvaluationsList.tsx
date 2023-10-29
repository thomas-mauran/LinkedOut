import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
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
  divider: {
    marginVertical: 8,
  },
});

const EvaluationsList: React.FC = ({}) => {
  const { data: evaluations, refetch } = useGetEvaluationsQuery('');

  const theme = useTheme();
  const isDarkTheme = theme.dark;

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
      <Text variant='headlineMedium' style={{ marginBottom: 10 }}>
        {i18n.t('profile.info.reviews')}
      </Text>
      {evaluations?.map((evaluation) => (
        <View key={evaluation.id} style={{ width: '100%' }}>
          <View
            style={[
              styles.horizontalContainer,
              { justifyContent: 'flex-start', marginBottom: 10 },
            ]}
          >
            <ProfilePicturePlaceholder
              username={`${evaluation.employerFirstName}${evaluation.employerLastName}`}
            />
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 10,
              }}
            >
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
                    style={
                      isDarkTheme ? { color: 'white' } : { color: 'black' }
                    }
                  />
                )}
              />
            </View>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ marginBottom: 10 }}>{`"${evaluation.review}"`}</Text>
            <Text>
              {new Date(evaluation.createdAt).toLocaleDateString('en-US')}
            </Text>
          </View>
          <Divider style={[styles.divider, { marginTop: 20 }]} />
        </View>
      ))}
    </ScrollView>
  );
};

export default EvaluationsList;
