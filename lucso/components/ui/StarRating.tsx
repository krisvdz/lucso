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
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Ionicons key={i} name="star" size={size} color={Colors.star} />);
    } else if (rating >= i - 0.5) {
      stars.push(<Ionicons key={i} name="star-half" size={size} color={Colors.star} />);
    } else {
      stars.push(<Ionicons key={i} name="star-outline" size={size} color={Colors.star} />);
    }
  }

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
