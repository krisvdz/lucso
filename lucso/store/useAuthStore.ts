import { create } from 'zustand';
import { User } from '@/types';

const mockUser: User = {
  id: 'u1',
  name: 'Kristen V.',
  email: 'kristen@example.com',
  bio: 'Makeup enthusiast based in Porto',
  postCount: 3,
  color: '#E8A0BF',
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (_email: string, _password: string) => {
    set({ user: mockUser, isAuthenticated: true });
    return true;
  },

  register: (name: string, email: string, _password: string) => {
    const newUser: User = {
      ...mockUser,
      name,
      email,
    };
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
