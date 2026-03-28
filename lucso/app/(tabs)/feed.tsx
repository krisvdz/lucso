import { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PostCard } from '@/components/feed/PostCard';
import { CommentSheet } from '@/components/feed/CommentSheet';
import { useFeedStore } from '@/store/useFeedStore';
import { useAuthStore } from '@/store/useAuthStore';
import { FeedPost } from '@/types';

export default function FeedScreen() {
  const router = useRouter();
  const posts = useFeedStore((s) => s.posts);
  const likePost = useFeedStore((s) => s.likePost);
  const addComment = useFeedStore((s) => s.addComment);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  const [commentPost, setCommentPost] = useState<FeedPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (!likedPosts.has(postId)) {
      likePost(postId);
      setLikedPosts((prev) => new Set(prev).add(postId));
    }
  };

  const handleComment = (post: FeedPost) => {
    setCommentPost(post);
  };

  const handleAddComment = (text: string) => {
    if (!commentPost || !user) return;
    addComment(commentPost.id, {
      id: `c-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      text,
      createdAt: new Date().toISOString(),
    });
    const updated = useFeedStore.getState().posts.find((p) => p.id === commentPost.id);
    if (updated) setCommentPost(updated);
  };

  const handleNewPost = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    Alert.alert('Coming Soon', 'Post creation will be available in a future update!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => handleLike(item.id)}
            onComment={() => handleComment(item)}
            liked={likedPosts.has(item.id)}
          />
        )}
      />

      <TouchableOpacity onPress={handleNewPost} style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <CommentSheet
        visible={!!commentPost}
        comments={commentPost?.comments || []}
        onClose={() => setCommentPost(null)}
        onAddComment={isAuthenticated ? handleAddComment : undefined}
        canComment={isAuthenticated}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.rose,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.roseDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
