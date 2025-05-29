import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

/**
 * RatingStars component - Displays star rating
 * @param {Object} props - Component props
 * @param {number} props.rating - Rating value (0-5)
 * @param {number} props.size - Size of stars (default: 16)
 * @param {string} props.activeColor - Color of active stars (default: #FFD700)
 * @param {string} props.inactiveColor - Color of inactive stars (default: #CCCCCC)
 */
export default function RatingStars({ 
  rating, 
  size = 16, 
  activeColor = '#FFD700', 
  inactiveColor = '#CCCCCC' 
}) {
  // Convert rating to array of 5 stars
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  // Generate 5 stars
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <Star 
          key={i}
          size={size} 
          color={activeColor} 
          fill={activeColor} 
          style={styles.star}
        />
      );
    } else if (i === fullStars && halfStar) {
      // Half star (not fully supported in lucide, using full star for now)
      stars.push(
        <Star 
          key={i}
          size={size} 
          color={activeColor} 
          fill={activeColor}
          style={styles.star}
        />
      );
    } else {
      // Empty star
      stars.push(
        <Star 
          key={i}
          size={size} 
          color={inactiveColor} 
          style={styles.star}
        />
      );
    }
  }
  
  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
});