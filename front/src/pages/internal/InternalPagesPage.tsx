import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { InternalPagesStackParamList } from '@/pages/internal/InternalPagesNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the InternalPagesPage component.
 */
type InternalPagesPageProps = NativeStackScreenProps<
  InternalPagesStackParamList,
  'PagesMain'
>;

/**
 * The internal page that has links to all the application pages.
 * @constructor
 */
const InternalPagesPage: FC<InternalPagesPageProps> = ({ navigation }) => {
  // Callbacks
  const handleProfilePress = useCallback(() => {
    navigation.navigate('PagesProfile');
  }, [navigation]);

  const handleJobOfferPress = useCallback(() => {
    navigation.navigate('PagesJobOffer');
  }, [navigation]);

  const handleMessagingPress = useCallback(() => {
    navigation.navigate('PagesMessaging');
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Button mode={'contained'} onPress={handleProfilePress}>
        Profile
      </Button>
      <Button mode={'contained'} onPress={handleJobOfferPress}>
        JobOffer
      </Button>
      <Button mode={'contained'} onPress={handleMessagingPress}>
        Messaging
      </Button>
    </ScrollView>
  );
};

export default InternalPagesPage;
