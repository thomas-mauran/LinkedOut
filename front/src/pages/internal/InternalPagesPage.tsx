import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * The internal page that has links to all the application pages.
 * @constructor
 */
const InternalPagesPage = () => {
  return (
    <View style={styles.container}>
      <Text>This is the InternalPagesPage.tsx file</Text>
    </View>
  );
};

export default InternalPagesPage;
