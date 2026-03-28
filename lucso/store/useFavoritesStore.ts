import { create } from 'zustand';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (productId: string) => {
    const { favoriteIds } = get();
    if (favoriteIds.includes(productId)) {
      set({ favoriteIds: favoriteIds.filter((id) => id !== productId) });
    } else {
      set({ favoriteIds: [...favoriteIds, productId] });
    }
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.includes(productId);
  },
}));
