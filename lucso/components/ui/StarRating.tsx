import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

function getStarName(rating: number, index: number): 'star' | 'star-half' | 'star-outline' {
  if (rating >= index) return 'star';
  if (rating >= index - 0.5) return 'star-half';
  return 'star-outline';
}

export function StarRating({ rating, size = 16, showValue = true, reviewCount }: StarRatingProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Ionicons key={i} name={getStarName(rating, i + 1)} size={size} color={Colors.star} />
      ))}
      {showValue && (
        <Text style={{ fontSize: size * 0.8, color: Colors.text, fontFamily: Fonts.bodySemiBold, marginLeft: 4 }}>
          {rating.toFixed(1)}
        </Text>
      )}
      {reviewCount !== undefined && (
        <Text style={{ fontSize: size * 0.75, color: Colors.textSecondary, fontFamily: Fonts.body }}>
          ({reviewCount.toLocaleString()})
        </Text>
      )}
    </View>
  );
}
