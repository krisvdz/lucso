import { useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryPills } from '@/components/home/CategoryPills';
import { BrandCard } from '@/components/home/BrandCard';
import { ProductCard } from '@/components/home/ProductCard';
import { brands } from '@/data/brands';
import { products } from '@/data/products';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection />

        <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Trending Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Brands</Text>
          <FlatList
            data={brands}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BrandCard
                brand={item}
                onPress={() => router.push(`/brand/${item.id}`)}
              />
            )}
          />
        </View>

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'Popular Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
          </Text>
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push(`/product/${product.id}`)}
                onAuthRequired={() => router.push('/auth/login')}
              />
            ))}
          </View>
        </View>

        {selectedCategory === 'all' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Rated</Text>
            <View style={styles.productsGrid}>
              {topRated.map((product) => (
                <ProductCard
                  key={`top-${product.id}`}
                  product={product}
                  onPress={() => router.push(`/product/${product.id}`)}
                  onAuthRequired={() => router.push('/auth/login')}
                />
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  brandsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
