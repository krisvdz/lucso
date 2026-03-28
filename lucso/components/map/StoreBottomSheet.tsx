import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Store } from '@/types';
import { brands } from '@/data/brands';

interface StoreBottomSheetProps {
  store: Store | null;
  onClose: () => void;
}

const typeColors: Record<string, string> = {
  beauty: Colors.roseLight,
  department: Colors.goldLight,
  pharmacy: '#D0F0D0',
  specialty: '#D0D8F0',
};

export function StoreBottomSheet({ store, onClose }: StoreBottomSheetProps) {
  if (!store) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    Linking.openURL(url);
  };

  const storeBrands = brands.filter((b) => store.brandIds.includes(b.id));

  return (
    <View style={styles.sheet}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{store.name}</Text>
          <Text style={styles.address}>{store.address}</Text>
          <StarRating rating={store.rating} size={14} />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.brands}>
        <Text style={styles.brandsTitle}>Available Brands</Text>
        <View style={styles.brandsList}>
          {storeBrands.map((b) => (
            <Badge key={b.id} label={b.name} small color={typeColors[store.type] || Colors.roseLight} />
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={handleDirections} style={styles.directionsButton}>
        <Ionicons name="navigate" size={18} color="#FFFFFF" />
        <Text style={styles.directionsText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  address: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  brands: {
    marginTop: 16,
  },
  brandsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  brandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.rose,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
  },
  directionsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
