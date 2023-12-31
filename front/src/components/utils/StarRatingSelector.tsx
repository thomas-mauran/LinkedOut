import { FC, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * The kind of a single star.
 */
enum StarKind {
  FULL_STAR,
  HALF_STAR,
  EMPTY_STAR,
}

/**
 * The styles for the StarRatingSelector component.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 8,
  },
});

/**
 * The props for the StarRatingSelector component.
 */
type StarRatingSelectorProps = {
  /**
   * The rating to display as stars.
   */
  rating: number;
  /**
   * Callback function to handle star press.
   */
  onStarPress?: (index: number) => void;
};

const StarRatingSelector: FC<StarRatingSelectorProps> = ({
  rating,
  onStarPress,
}) => {
  // Theme
  const theme = useTheme();
  const [selectedStars, setSelectedStars] = useState<number>(0);

  const starArray = useMemo((): StarKind[] => {
    const res: StarKind[] = [];
    let remaining = Math.floor(Math.max(0, Math.min(5, rating)) * 2);

    while (remaining >= 2) {
      res.push(StarKind.FULL_STAR);
      remaining -= 2;
    }

    if (remaining === 1) {
      res.push(StarKind.HALF_STAR);
    }

    while (res.length < 5) {
      res.push(StarKind.EMPTY_STAR);
    }

    return res;
  }, [rating]);

  const handleStarPress = (index: number) => {
    setSelectedStars(index + 1);
    if (onStarPress) {
      onStarPress(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {starArray.map((star, index) => (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
          <MaterialCommunityIcons
            name={
              star === StarKind.FULL_STAR
                ? 'star'
                : star === StarKind.HALF_STAR
                ? 'star-half-full'
                : 'star-outline'
            }
            size={24}
            style={{
              color:
                index < selectedStars
                  ? theme.colors.primary
                  : theme.colors.onSurface,
            }}
          />
        </TouchableOpacity>
      ))}

      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

export default StarRatingSelector;
