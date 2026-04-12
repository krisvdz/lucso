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

export function StarRating({ rating, size = 16, showValue = true, reviewCount }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const index = i + 1;
    if (rating >= index) {
      return <Ionicons key={index} name="star" size={size} color={Colors.star} />;
    } else if (rating >= index - 0.5) {
      return <Ionicons key={index} name="star-half" size={size} color={Colors.star} />;
    } else {
      return <Ionicons key={index} name="star-outline" size={size} color={Colors.star} />;
    }
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {stars}
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
