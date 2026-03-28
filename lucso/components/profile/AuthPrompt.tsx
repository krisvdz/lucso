import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Button } from '@/components/ui/Button';
import { LucsoLogo } from '@/components/ui/LucsoLogo';

interface AuthPromptProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function AuthPrompt({ onLogin, onRegister }: AuthPromptProps) {
  return (
    <View style={styles.container}>
      <LucsoLogo size={64} showText={false} />
      <Text style={styles.title}>Join Lucso</Text>
      <Text style={styles.subtitle}>
        Sign in to save your favorite products, post your looks, and join the beauty community.
      </Text>
      <View style={styles.buttons}>
        <Button title="Sign In" onPress={onLogin} fullWidth />
        <Button title="Create Account" onPress={onRegister} variant="outline" fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.heading,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: 300,
  },
  buttons: {
    width: '100%',
    gap: 12,
    maxWidth: 320,
  },
});
