import { create } from 'zustand';
import { FeedPost, Comment } from '@/types';
import { posts as initialPosts } from '@/data/posts';

interface FeedState {
  posts: FeedPost[];
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: initialPosts,

  likePost: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    }));
  },

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
