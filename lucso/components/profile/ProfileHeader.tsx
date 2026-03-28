import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/ui/Avatar';
import { User } from '@/types';

interface ProfileHeaderProps {
  user: User;
  favoritesCount: number;
}

export function ProfileHeader({ user, favoritesCount }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar name={user.name} size={80} color={user.color} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user.postCount}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{favoritesCount}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
  },
  bio: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
});
