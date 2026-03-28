import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
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

function WebMap({ onSelectStore }: { onSelectStore: (store: Store) => void }) {
  // Build OpenStreetMap markers URL
  const markers = stores
    .map((s) => `${s.latitude},${s.longitude}`)
    .join('~');

  // Use an iframe with OpenStreetMap centered on Porto
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; }
        #map { width: 100%; height: 100%; }
        .custom-popup { font-family: system-ui, -apple-system, sans-serif; }
        .custom-popup h3 { font-size: 14px; margin-bottom: 4px; color: #2D2024; }
        .custom-popup p { font-size: 12px; color: #8C7284; margin: 2px 0; }
        .custom-popup .rating { color: #F5B041; font-weight: bold; }
        .custom-popup a {
          display: inline-block; margin-top: 8px; padding: 6px 16px;
          background: #E8A0BF; color: white; border-radius: 8px;
          text-decoration: none; font-size: 12px; font-weight: 600;
        }
        .custom-popup a:hover { background: #C77DA3; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([41.1579, -8.6291], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var typeColors = ${JSON.stringify(typeColors)};
        var stores = ${JSON.stringify(stores)};
        var brandsData = ${JSON.stringify(brands)};

        stores.forEach(function(store) {
          var color = typeColors[store.type] || '#E8A0BF';
          var storeBrands = brandsData
            .filter(function(b) { return store.brandIds.indexOf(b.id) !== -1; })
            .map(function(b) { return b.name; })
            .join(', ');

          var icon = L.divIcon({
            className: '',
            html: '<div style="width:32px;height:32px;background:' + color + ';border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          var popup = '<div class="custom-popup">' +
            '<h3>' + store.name + '</h3>' +
            '<p>' + store.address + '</p>' +
            '<p class="rating">★ ' + store.rating.toFixed(1) + '</p>' +
            '<p style="font-size:11px;margin-top:4px;">' + storeBrands + '</p>' +
            '<a href="https://www.google.com/maps/dir/?api=1&destination=' + store.latitude + ',' + store.longitude + '" target="_blank">Get Directions</a>' +
            '</div>';

          L.marker([store.latitude, store.longitude], { icon: icon })
            .addTo(map)
            .bindPopup(popup);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.webMapContainer}>
      {Platform.OS === 'web' ? (
        <iframe
          srcDoc={mapHtml}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 16,
          } as any}
          title="Lucso Store Map"
        />
      ) : null}
    </View>
  );
}

function StoreCard({ store, onPress }: { store: Store; onPress: () => void }) {
  const storeBrands = brands.filter((b) => store.brandIds.includes(b.id));
  return (
    <TouchableOpacity style={styles.storeCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.storeCardHeader}>
        <View style={[styles.storeIcon, { backgroundColor: typeColors[store.type] || Colors.rose }]}>
          <Ionicons name={(typeIcons[store.type] || 'location') as any} size={18} color="#FFFFFF" />
        </View>
        <View style={styles.storeCardInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.storeAddress}>{store.address}</Text>
          <StarRating rating={store.rating} size={12} />
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
}

export default function MapScreen() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    Linking.openURL(url);
  };

  // Web: show interactive Leaflet map + store list
  if (Platform.OS === 'web' || !MapView) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.webHeader}>
            <Ionicons name="map" size={28} color={Colors.rose} />
            <Text style={styles.webTitle}>Stores Near Porto</Text>
            <Text style={styles.webSubtitle}>Find your favorite beauty products nearby</Text>
          </View>

          <WebMap onSelectStore={setSelectedStore} />

          <View style={styles.storeListSection}>
            <Text style={styles.storeListTitle}>All Stores</Text>
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onPress={() => handleDirections(store)}
              />
            ))}
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 4,
  },
  webTitle: {
    fontSize: 24,
    fontFamily: Fonts.heading,
    color: Colors.text,
    marginTop: 8,
  },
  webSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
  },
  webMapContainer: {
    marginHorizontal: 16,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  storeListSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  storeListTitle: {
    fontSize: 20,
    fontFamily: Fonts.heading,
    color: Colors.text,
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
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
  },
  storeAddress: {
    fontSize: 13,
    fontFamily: Fonts.body,
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
