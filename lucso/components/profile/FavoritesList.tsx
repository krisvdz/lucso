import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { StarRating } from '@/components/ui/StarRating';
import { products } from '@/data/products';

interface FavoritesListProps {
  favoriteIds: string[];
  onProductPress: (productId: string) => void;
}

export function FavoritesList({ favoriteIds, onProductPress }: FavoritesListProps) {
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>Browse products and tap the heart to save them here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View style={styles.grid}>
        {favoriteProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.card}
            onPress={() => onProductPress(product.id)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={product.gradientColors}
              style={styles.image}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
              <Text style={styles.brand}>{product.brandName}</Text>
              <StarRating rating={product.rating} size={10} showValue={false} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  image: {
    height: 100,
  },
  info: {
    padding: 8,
    gap: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  brand: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
