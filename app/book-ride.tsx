import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Search, MapPin, Clock, Recycle as Bicycle, Briefcase, Navigation } from 'lucide-react-native';

/**
 * BookRideScreen component - Handles ride booking flow
 * Allows users to select pickup/dropoff locations and ride type
 */
export default function BookRideScreen() {
  const [pickup, setPickup] = useState('Current Location');
  const [dropoff, setDropoff] = useState('');
  const [selectedRideType, setSelectedRideType] = useState('standard');
  
  // Mock data for saved places
  const savedPlaces = [
    { id: '1', name: 'Home', address: '123 Main St', icon: 'home' },
    { id: '2', name: 'Work', address: '456 Business Ave', icon: 'briefcase' },
    { id: '3', name: 'Gym', address: '789 Fitness Blvd', icon: 'dumbbell' },
  ];
  
  // Mock data for ride types
  const rideTypes = [
    { 
      id: 'standard', 
      name: 'Standard', 
      price: '$5.50', 
      time: '3 min',
      image: 'https://images.pexels.com/photos/5484276/pexels-photo-5484276.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price: '$8.75', 
      time: '5 min',
      image: 'https://images.pexels.com/photos/1715215/pexels-photo-1715215.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    { 
      id: 'express', 
      name: 'Express', 
      price: '$12.00', 
      time: '2 min',
      image: 'https://images.pexels.com/photos/2911280/pexels-photo-2911280.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  // Handle ride confirmation
  const confirmRide = () => {
    if (!dropoff) {
      alert('Please enter a destination');
      return;
    }
    
    // In a real app, we would make an API call to request a ride
    console.log('Booking ride:', { pickup, dropoff, rideType: selectedRideType });
    
    // Navigate to ride confirmation screen
    router.push('/ride-confirmation');
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
        <Text style={styles.headerTitle}>Book a Ride</Text>
      </View>
      
      {/* Location Inputs */}
      <View style={styles.locationContainer}>
        <View style={styles.locationPointers}>
          <View style={styles.originPointer} />
          <View style={styles.routeLine} />
          <View style={styles.destinationPointer} />
        </View>
        
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.locationInput}
              placeholder="Pickup location"
              value={pickup}
              onChangeText={setPickup}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.locationInput}
              placeholder="Where to?"
              value={dropoff}
              onChangeText={setDropoff}
              autoFocus={true}
            />
          </View>
        </View>
      </View>
      
      {/* Saved Places Section */}
      <View style={styles.savedPlacesContainer}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.savedPlacesScroll}>
          {savedPlaces.map((place) => (
            <TouchableOpacity 
              key={place.id} 
              style={styles.savedPlaceItem}
              onPress={() => setDropoff(place.address)}
            >
              <View style={styles.savedPlaceIcon}>
                {place.icon === 'home' && <MapPin size={16} color="#FFFFFF" />}
                {place.icon === 'briefcase' && <Briefcase size={16} color="#FFFFFF" />}
                {place.icon === 'dumbbell' && <Bicycle size={16} color="#FFFFFF" />}
              </View>
              <Text style={styles.savedPlaceName}>{place.name}</Text>
              <Text style={styles.savedPlaceAddress} numberOfLines={1}>{place.address}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Ride Types Section */}
      <View style={styles.rideTypesContainer}>
        <Text style={styles.sectionTitle}>Choose Ride Type</Text>
        
        {rideTypes.map((ride) => (
          <TouchableOpacity 
            key={ride.id}
            style={[
              styles.rideTypeItem,
              selectedRideType === ride.id && styles.selectedRideType
            ]}
            onPress={() => setSelectedRideType(ride.id)}
          >
            <Image source={{ uri: ride.image }} style={styles.rideImage} />
            
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{ride.name}</Text>
              <View style={styles.rideInfoContainer}>
                <View style={styles.rideTimeContainer}>
                  <Clock size={14} color="#666666" />
                  <Text style={styles.rideTime}>{ride.time}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.ridePrice}>{ride.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Confirm Button */}
      <TouchableOpacity 
        style={[
          styles.confirmButton,
          !dropoff && styles.disabledButton
        ]}
        onPress={confirmRide}
        disabled={!dropoff}
      >
        <Text style={styles.confirmButtonText}>Confirm Ride</Text>
        <Navigation size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
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
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  locationPointers: {
    width: 16,
    alignItems: 'center',
    marginRight: 16,
  },
  originPointer: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0066CC',
    marginTop: 18,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#CCCCCC',
    marginVertical: 4,
  },
  destinationPointer: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9500',
    marginBottom: 18,
  },
  inputsContainer: {
    flex: 1,
  },
  inputWrapper: {
    height: 50,
    justifyContent: 'center',
  },
  locationInput: {
    fontSize: 16,
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  savedPlacesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
    color: '#333333',
  },
  savedPlacesScroll: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  savedPlaceItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 120,
  },
  savedPlaceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  savedPlaceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  savedPlaceAddress: {
    fontSize: 12,
    color: '#666666',
  },
  rideTypesContainer: {
    marginBottom: 24,
  },
  rideTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedRideType: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F8FF',
  },
  rideImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  rideDetails: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  rideInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTime: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  confirmButton: {
    backgroundColor: '#0066CC',
    height: 54,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});