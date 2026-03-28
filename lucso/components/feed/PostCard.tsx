import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Avatar } from '@/components/ui/Avatar';
import { FeedPost } from '@/types';

interface PostCardProps {
  post: FeedPost;
  onLike: () => void;
  onComment: () => void;
  liked?: boolean;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

const avatarColors = ['#E8A0BF', '#D4A574', '#7ECEC1', '#C77DA3', '#5B8C5A'];

export function PostCard({ post, onLike, onComment, liked = false }: PostCardProps) {
  const colorIndex = post.userName.charCodeAt(0) % avatarColors.length;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar name={post.userName} size={36} color={avatarColors[colorIndex]} />
        <View style={styles.headerText}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.time}>{timeAgo(post.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {post.image ? (
          <Image source={{ uri: post.image }} style={styles.image} />
        ) : (
          <LinearGradient
            colors={post.gradientColors}
            style={styles.image}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike} style={styles.actionButton}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? Colors.rose : Colors.text}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color={Colors.text} />
          <Text style={styles.actionText}>{post.comments.length}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.caption}>
        <Text style={styles.captionName}>{post.userName} </Text>
        {post.caption}
      </Text>

      {post.tags.length > 0 && (
        <Text style={styles.tags}>
          {post.tags.map((t) => `#${t}`).join(' ')}
        </Text>
      )}

      {post.comments.length > 0 && (
        <TouchableOpacity onPress={onComment}>
          <Text style={styles.viewComments}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  headerText: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.surfaceDim,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.text,
  },
  caption: {
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.text,
    lineHeight: 20,
  },
  captionName: {
    fontFamily: Fonts.bodyBold,
  },
  tags: {
    paddingHorizontal: 12,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: Fonts.bodyMedium,
    color: Colors.rose,
  },
  viewComments: {
    paddingHorizontal: 12,
    paddingTop: 6,
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
  },
});
