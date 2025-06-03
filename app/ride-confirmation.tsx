import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MapPin, Phone, MessageSquare, Star } from 'lucide-react-native';

/**
 * RideConfirmationScreen component - Shows ride confirmation details
 * Displays driver info, ride status, and tracking
 */
export default function RideConfirmationScreen() {
  const [rideStatus, setRideStatus] = useState('searching'); // searching, confirmed, arrived, started, completed
  const [estimatedTime, setEstimatedTime] = useState(5);
  const [driver, setDriver] = useState(null);
  
  // Mock driver data
  const driverData = {
    id: 'd123',
    name: 'Michael Rodriguez',
    rating: 4.9,
    rides: 328,
    phone: '+1 (555) 123-4567',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    vehicle: {
      model: 'Honda CBR 600',
      color: 'Red',
      plate: 'MTC-1234',
    },
  };
  
  // Simulate ride progress
  useEffect(() => {
    // Find a driver
    const driverTimer = setTimeout(() => {
      setRideStatus('confirmed');
      setDriver(driverData);
    }, 3000);
    
    // Update countdown
    const countdownInterval = setInterval(() => {
      setEstimatedTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute
    
    return () => {
      clearTimeout(driverTimer);
      clearInterval(countdownInterval);
    };
  }, []);
  
  // Handle ride cancellation
  const cancelRide = () => {
    // In a real app, we would make an API call to cancel the ride
    console.log('Cancelling ride');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Ride</Text>
      </View>
      
      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Map View</Text>
        
        {/* Ride Progress Overlay */}
        <View style={styles.rideProgressContainer}>
          <View style={styles.routePointContainer}>
            <View style={styles.originPoint} />
            <View style={styles.routeLine} />
            <View style={styles.destinationPoint} />
          </View>
          
          <View style={styles.routeDetails}>
            <Text style={styles.routeText}>123 Main St</Text>
            <Text style={styles.routeText}>456 Market St</Text>
          </View>
        </View>
      </View>
      
      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Ride Status */}
        <View style={styles.rideStatusContainer}>
          {rideStatus === 'searching' ? (
            <>
              <ActivityIndicator size="small\" color="#0066CC\" style={styles.statusIndicator} />
              <Text style={styles.rideStatusText}>Searching for a driver...</Text>
            </>
          ) : (
            <>
              <View style={styles.statusIndicator}>
                <MapPin size={16} color="#0066CC" />
              </View>
              <Text style={styles.rideStatusText}>
                Driver arrives in {estimatedTime} {estimatedTime === 1 ? 'minute' : 'minutes'}
              </Text>
            </>
          )}
        </View>
        
        {/* Driver Info */}
        {driver && (
          <View style={styles.driverContainer}>
            <Image source={{ uri: driver.photo }} style={styles.driverPhoto} />
            
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              
              <View style={styles.driverRatingContainer}>
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.driverRating}>{driver.rating} • {driver.rides} rides</Text>
              </View>
              
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleText}>
                  {driver.vehicle.model} • {driver.vehicle.color} • {driver.vehicle.plate}
                </Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {driver && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionButtonIcon}>
                  <Phone size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionButtonIcon}>
                  <MessageSquare size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={cancelRide}
          >
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E1E7F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    fontSize: 18,
    color: '#666666',
  },
  rideProgressContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routePointContainer: {
    width: 16,
    alignItems: 'center',
    marginRight: 16,
  },
  originPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066CC',
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#CCCCCC',
    marginVertical: 4,
  },
  destinationPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9500',
  },
  routeDetails: {
    justifyContent: 'space-between',
    height: 50,
  },
  routeText: {
    fontSize: 14,
    color: '#666666',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  rideStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rideStatusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  driverContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  driverPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  driverRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverRating: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleText: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    flexDirection: 'row',
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});