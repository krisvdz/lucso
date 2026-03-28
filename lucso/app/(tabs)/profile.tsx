import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/ui/Button';
import { AuthPrompt } from '@/components/profile/AuthPrompt';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FavoritesList } from '@/components/profile/FavoritesList';
import { useAuthStore } from '@/store/useAuthStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <AuthPrompt
          onLogin={() => router.push('/auth/login')}
          onRegister={() => router.push('/auth/register')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} favoritesCount={favoriteIds.length} />
        <FavoritesList
          favoriteIds={favoriteIds}
          onProductPress={(id) => router.push(`/product/${id}`)}
        />
        <Button
          title="Sign Out"
          onPress={logout}
          variant="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 32,
  },
});
