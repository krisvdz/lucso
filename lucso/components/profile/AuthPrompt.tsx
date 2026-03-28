import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';

interface AuthPromptProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function AuthPrompt({ onLogin, onRegister }: AuthPromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="sparkles" size={40} color={Colors.rose} />
      </View>
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
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.roseLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
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
