import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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
 * The styles for the StarRating component.
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
 * The props for the StarRating component.
 */
type StarRatingProps = {
  /**
   * The rating to display as stars.
   */
  rating: number;
};

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  // Theme
  const theme = useTheme();

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

  return (
    <View style={styles.container}>
      {starArray.map((star, index) => (
        <MaterialCommunityIcons
          key={index}
          name={
            star === StarKind.FULL_STAR
              ? 'star'
              : star === StarKind.HALF_STAR
              ? 'star-half-full'
              : 'star-outline'
          }
          size={24}
          style={{ color: theme.colors.onSurface }}
        />
      ))}

      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
};

export default StarRating;
