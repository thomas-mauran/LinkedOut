import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * The styles for the BigButton component.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginLeft: 'auto',
  },
  rippleContainer: {
    overflow: 'hidden',
  },
  subtitle: {
    marginBottom: 2,
    marginTop: 2,
  },
  textContainer: {
    marginRight: 8,
  },
});

/**
 * The props for the BigButton component.
 */
type BigButtonProps = {
  /**
   * The title of the button.
   */
  title: string;

  /**
   * The subtitle of the button.
   */
  subtitle: string;

  /**
   * The function to call when the button is pressed.
   */
  onPress?: () => void;
};

/**
 * A big and nice button.
 * @constructor
 */
const BigButton: FC<BigButtonProps> = ({ title, subtitle, onPress }) => {
  // Theme
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.rippleContainer,
        {
          borderRadius: 3 * theme.roundness,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.secondaryContainer,
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text variant='labelLarge'>{title}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <MaterialCommunityIcons
          name='chevron-right'
          size={24}
          style={[styles.icon, { color: theme.colors.onSurface }]}
        />
      </View>
    </TouchableRipple>
  );
};

export default BigButton;
