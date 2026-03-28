import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import { stores } from '@/data/stores';
import { reviews } from '@/data/reviews';
import { useAuthStore } from '@/store/useAuthStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === id);
  const productStores = stores.filter((s) => product.whereToBuy.includes(s.id));

  const handleFavorite = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    toggleFavorite(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: product.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)']}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <TouchableOpacity onPress={() => router.push(`/brand/${product.brandId}`)}>
                <Text style={styles.brand}>{product.brandName}</Text>
              </TouchableOpacity>
              <Text style={styles.name}>{product.name}</Text>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          {product.shades && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shades</Text>
              <View style={styles.shadesList}>
                {product.shades.map((shade) => (
                  <Badge key={shade} label={shade} color={Colors.surfaceDim} />
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Where to Buy</Text>
            {productStores.map((store) => (
              <Card key={store.id} style={styles.storeCard}>
                <View style={styles.storeRow}>
                  <Ionicons name="location" size={18} color={Colors.rose} />
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews ({productReviews.length})</Text>
            {productReviews.map((review) => (
              <Card key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Avatar name={review.userName} size={32} color={Colors.gold} />
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewerName}>{review.userName}</Text>
                    <StarRating rating={review.rating} size={11} showValue={false} />
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
                <View style={styles.helpfulRow}>
                  <Ionicons name="thumbs-up-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.helpfulText}>{review.helpful} found helpful</Text>
                </View>
              </Card>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? Colors.rose : Colors.text}
          />
        </TouchableOpacity>
        <Button title="Find in Store" onPress={() => router.push('/(tabs)/map')} style={styles.buyButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  heroContainer: {
    height: 320,
    width: '100%',
    backgroundColor: Colors.surfaceDim,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -20,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  brand: {
    fontSize: 14,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.rose,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.heading,
    color: Colors.text,
  },
  price: {
    fontSize: 24,
    fontFamily: Fonts.heading,
    color: Colors.gold,
    marginLeft: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: Fonts.heading,
    color: Colors.text,
    marginBottom: 10,
  },
  shadesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  description: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  storeCard: {
    marginBottom: 8,
    padding: 12,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 15,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
  },
  storeAddress: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reviewCard: {
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  reviewInfo: {
    flex: 1,
    gap: 2,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.textLight,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.text,
    lineHeight: 20,
  },
  helpfulRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  helpfulText: {
    fontSize: 12,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  favoriteButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    flex: 1,
  },
});
