import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const variantStyles = {
  primary: { bg: Colors.rose, text: Colors.surface, border: Colors.rose },
  secondary: { bg: Colors.gold, text: Colors.surface, border: Colors.gold },
  outline: { bg: Colors.transparent, text: Colors.rose, border: Colors.rose },
};

const sizeStyles = {
  sm: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 },
  md: { paddingHorizontal: 24, paddingVertical: 14, fontSize: 16 },
  lg: { paddingHorizontal: 32, paddingVertical: 18, fontSize: 18 },
};

export function Button({ title, onPress, variant = 'primary', size = 'md', fullWidth = false, disabled = false, style, accessibilityLabel }: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sz = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled }}
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.bg,
          borderColor: variantStyle.border,
          opacity: disabled ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          paddingHorizontal: sz.paddingHorizontal,
          paddingVertical: sz.paddingVertical,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: variantStyle.text, fontSize: sz.fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.bodySemiBold,
  },
});
