import React from 'react';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';

interface LucsoLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: number;
}

export function LucsoLogo({ size = 40, showText = true, textSize }: LucsoLogoProps) {
  const calculatedTextSize = textSize || size * 0.7;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E8A0BF" />
            <Stop offset="100%" stopColor="#C77DA3" />
          </LinearGradient>
          <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#D4A574" />
            <Stop offset="100%" stopColor="#C49060" />
          </LinearGradient>
        </Defs>
        {/* Main circle */}
        <Circle cx="50" cy="50" r="46" fill="url(#grad1)" />
        {/* Inner decorative petal shapes - like a flower/makeup compact */}
        <Path
          d="M50 15 C60 30, 70 40, 50 50 C30 40, 40 30, 50 15Z"
          fill="rgba(255,255,255,0.3)"
        />
        <Path
          d="M85 50 C70 60, 60 70, 50 50 C60 30, 70 40, 85 50Z"
          fill="rgba(255,255,255,0.25)"
        />
        <Path
          d="M50 85 C40 70, 30 60, 50 50 C70 60, 60 70, 50 85Z"
          fill="rgba(255,255,255,0.2)"
        />
        <Path
          d="M15 50 C30 40, 40 30, 50 50 C40 70, 30 60, 15 50Z"
          fill="rgba(255,255,255,0.15)"
        />
        {/* Center sparkle */}
        <Circle cx="50" cy="50" r="8" fill="url(#grad2)" />
        <Circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.6)" />
        {/* Small accent dots */}
        <Circle cx="50" cy="22" r="2.5" fill="rgba(255,255,255,0.5)" />
        <Circle cx="78" cy="50" r="2.5" fill="rgba(255,255,255,0.5)" />
        <Circle cx="50" cy="78" r="2.5" fill="rgba(255,255,255,0.4)" />
        <Circle cx="22" cy="50" r="2.5" fill="rgba(255,255,255,0.4)" />
      </Svg>
      {showText && (
        <Text style={[styles.text, { fontSize: calculatedTextSize }]}>Lucso</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#E8A0BF',
    letterSpacing: -0.5,
  },
});
