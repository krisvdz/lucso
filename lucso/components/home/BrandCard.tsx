import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  onPress: () => void;
}

export function BrandCard({ brand, onPress }: BrandCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <View style={[styles.logo, { backgroundColor: brand.color }]}>
        <Text style={styles.logoText}>{brand.name[0]}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>{brand.name}</Text>
      <StarRating rating={brand.rating} size={12} showValue={false} />
      <Badge label={brand.category} small color={Colors.goldLight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: Fonts.heading,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
    textAlign: 'center',
  },
});
