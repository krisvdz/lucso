import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
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

export function Button({ title, onPress, variant = 'primary', fullWidth = false, disabled = false, style, accessibilityLabel }: ButtonProps) {
  const variantStyle = variantStyles[variant];

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
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: variantStyle.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bodySemiBold,
  },
});
