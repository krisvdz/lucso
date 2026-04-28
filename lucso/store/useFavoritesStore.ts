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
    const isFav = favoriteIds.includes(productId);
    set({
      favoriteIds: isFav
        ? favoriteIds.filter((id) => id !== productId)
        : [...favoriteIds, productId],
    });
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.includes(productId);
  },
}));
