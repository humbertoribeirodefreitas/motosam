import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * RideFare component - Displays ride fare details
 * @param {Object} props - Component props
 * @param {number} props.baseFare - Base fare amount
 * @param {number} props.distance - Ride distance in kilometers
 * @param {number} props.time - Ride time in minutes
 * @param {number} props.distanceRate - Rate per kilometer
 * @param {number} props.timeRate - Rate per minute
 */
export default function RideFare({ 
  baseFare = 2.50,
  distance = 0,
  time = 0,
  distanceRate = 0.75,
  timeRate = 0.15
}) {
  // Calculate fare components
  const distanceCost = distance * distanceRate;
  const timeCost = time * timeRate;
  const subtotal = baseFare + distanceCost + timeCost;
  const serviceFee = subtotal * 0.10; // 10% service fee
  const total = subtotal + serviceFee;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fare Breakdown</Text>
      
      <View style={styles.fareItem}>
        <Text style={styles.fareLabel}>Base Fare</Text>
        <Text style={styles.fareAmount}>${baseFare.toFixed(2)}</Text>
      </View>
      
      <View style={styles.fareItem}>
        <Text style={styles.fareLabel}>Distance ({distance.toFixed(1)} km)</Text>
        <Text style={styles.fareAmount}>${distanceCost.toFixed(2)}</Text>
      </View>
      
      <View style={styles.fareItem}>
        <Text style={styles.fareLabel}>Time ({time} min)</Text>
        <Text style={styles.fareAmount}>${timeCost.toFixed(2)}</Text>
      </View>
      
      <View style={styles.fareItem}>
        <Text style={styles.fareLabel}>Subtotal</Text>
        <Text style={styles.fareAmount}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.fareItem}>
        <Text style={styles.fareLabel}>Service Fee</Text>
        <Text style={styles.fareAmount}>${serviceFee.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.fareItem, styles.totalItem]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  fareLabel: {
    fontSize: 14,
    color: '#666666',
  },
  fareAmount: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  totalItem: {
    borderBottomWidth: 0,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066CC',
  },
});