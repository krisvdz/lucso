import { create } from 'zustand';
import { FeedPost, Comment } from '@/types';
import { posts as initialPosts } from '@/data/posts';

interface FeedState {
  posts: FeedPost[];
  likedPostIds: Set<string>;
  toggleLike: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  addComment: (postId: string, comment: Comment) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: initialPosts,
  likedPostIds: new Set(),

  toggleLike: (postId: string) => {
    const { likedPostIds } = get();
    const liked = likedPostIds.has(postId);
    const updatedIds = new Set(likedPostIds);
    liked ? updatedIds.delete(postId) : updatedIds.add(postId);
    set((state) => ({
      likedPostIds: updatedIds,
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + (liked ? -1 : 1) } : post
      ),
    }));
  },

  isLiked: (postId: string) => get().likedPostIds.has(postId),

  addComment: (postId: string, comment: Comment) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    }));
  },
}));
