import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { StoreBottomSheet } from '@/components/map/StoreBottomSheet';
import { stores } from '@/data/stores';
import { brands } from '@/data/brands';
import { Store } from '@/types';

let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
  } catch {
    // Maps not available
  }
}

const typeIcons: Record<string, string> = {
  beauty: 'sparkles',
  department: 'storefront',
  pharmacy: 'medical',
  specialty: 'star',
};

const typeColors: Record<string, string> = {
  beauty: Colors.rose,
  department: Colors.gold,
  pharmacy: '#27AE60',
  specialty: '#5B7FD4',
};

export default function MapScreen() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    Linking.openURL(url);
  };

  // Web fallback: show a list of stores
  if (Platform.OS === 'web' || !MapView) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.webHeader}>
          <Ionicons name="map" size={28} color={Colors.rose} />
          <Text style={styles.webTitle}>Stores Near Porto</Text>
          <Text style={styles.webSubtitle}>Find your favorite beauty products nearby</Text>
        </View>
        <FlatList
          data={stores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.storeList}
          renderItem={({ item }) => {
            const storeBrands = brands.filter((b) => item.brandIds.includes(b.id));
            return (
              <TouchableOpacity
                style={styles.storeCard}
                onPress={() => handleDirections(item)}
                activeOpacity={0.7}
              >
                <View style={styles.storeCardHeader}>
                  <View style={[styles.storeIcon, { backgroundColor: typeColors[item.type] || Colors.rose }]}>
                    <Ionicons
                      name={(typeIcons[item.type] || 'location') as any}
                      size={18}
                      color="#FFFFFF"
                    />
                  </View>
                  <View style={styles.storeCardInfo}>
                    <Text style={styles.storeName}>{item.name}</Text>
                    <Text style={styles.storeAddress}>{item.address}</Text>
                    <StarRating rating={item.rating} size={12} />
                  </View>
                  <Ionicons name="navigate-outline" size={20} color={Colors.rose} />
                </View>
                <View style={styles.storeBrands}>
                  {storeBrands.map((b) => (
                    <Badge key={b.id} label={b.name} small color={Colors.roseLight} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }

  // Native map
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.1579,
          longitude: -8.6291,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={store.address}
            pinColor={typeColors[store.type] || Colors.rose}
            onPress={() => setSelectedStore(store)}
          />
        ))}
      </MapView>

      <StoreBottomSheet store={selectedStore} onClose={() => setSelectedStore(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 4,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  webSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  storeList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  storeCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  storeCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  storeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeCardInfo: {
    flex: 1,
    gap: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  storeAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  storeBrands: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
    paddingLeft: 52,
  },
});
