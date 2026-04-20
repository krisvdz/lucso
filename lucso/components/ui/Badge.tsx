import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  small?: boolean;
}

export function Badge({ label, color = Colors.roseLight, textColor = Colors.text, small = false }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, small && styles.small]}>
      <Text style={[styles.text, { color: textColor }, small && styles.smallText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.text,
  },
  smallText: {
    fontSize: 11,
  },
});
