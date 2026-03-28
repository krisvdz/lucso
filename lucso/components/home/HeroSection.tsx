import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { LucsoLogo } from '@/components/ui/LucsoLogo';

export function HeroSection() {
  return (
    <View style={styles.container}>
      <LucsoLogo size={44} textSize={34} />
      <Text style={styles.subtitle}>Discover your next favorite beauty product</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          placeholder="Search products, brands..."
          placeholderTextColor={Colors.textLight}
          style={styles.searchInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.text,
  },
});
