import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Navigation, Search } from 'lucide-react-native';
import { Link } from 'expo-router';

// Mock data for recent places
const recentPlaces = [
  { id: '1', name: 'Home', address: '123 Main St', icon: 'home' },
  { id: '2', name: 'Work', address: '456 Business Ave', icon: 'briefcase' },
  { id: '3', name: 'Gym', address: '789 Fitness Blvd', icon: 'dumbbell' },
];

/**
 * HomeScreen component - Main screen of the MotoSam app
 * Displays map (placeholder), search bar, and recent places
 */
export default function HomeScreen() {
  const [userLocation, setUserLocation] = useState('Determining your location...');
  
  // Simulate getting user location
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserLocation('Current Location: 123 Main Street');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Map View Placeholder */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Map View</Text>
        <View style={styles.currentLocationBadge}>
          <MapPin size={16} color="#0066CC" />
          <Text style={styles.currentLocationText}>{userLocation}</Text>
        </View>
      </View>
      
      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => {/* Navigate to search screen */}}
        >
          <Search size={20} color="#666666" />
          <Text style={styles.searchText}>Where to?</Text>
        </TouchableOpacity>
        
        {/* Recent Places */}
        <View style={styles.recentPlacesContainer}>
          <Text style={styles.sectionTitle}>Recent Places</Text>
          {recentPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeItem}>
              <View style={styles.placeIconContainer}>
                <MapPin size={18} color="#FFFFFF" />
              </View>
              <View style={styles.placeDetails}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress}>{place.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Book Ride Button */}
        <Link href="/book-ride" asChild>
          <TouchableOpacity style={styles.bookRideButton}>
            <Text style={styles.bookRideText}>Book a Ride</Text>
            <Navigation size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    height: height * 0.6,
    backgroundColor: '#E1E7F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    fontSize: 18,
    color: '#666666',
  },
  currentLocationBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentLocationText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#333333',
  },
  bottomSheet: {
    height: height * 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchBar: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666666',
  },
  recentPlacesContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333333',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeDetails: {
    marginLeft: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  placeAddress: {
    fontSize: 14,
    color: '#666666',
  },
  bookRideButton: {
    backgroundColor: '#0066CC',
    height: 54,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookRideText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});