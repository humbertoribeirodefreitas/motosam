import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { ChevronRight, Star } from 'lucide-react-native';

// Mock data for ride history
const rideHistory = [
  {
    id: '1',
    date: 'Today, 2:30 PM',
    pickup: '123 Main St',
    dropoff: '456 Market St',
    price: '$8.50',
    status: 'completed',
    driverName: 'John D.',
    driverRating: 4.8,
    driverImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: '2',
    date: 'Yesterday, 5:15 PM',
    pickup: '789 Park Ave',
    dropoff: '101 Business Center',
    price: '$12.75',
    status: 'completed',
    driverName: 'Sarah M.',
    driverRating: 4.9,
    driverImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
  {
    id: '3',
    date: 'Jul 15, 9:20 AM',
    pickup: 'Airport Terminal 2',
    dropoff: 'Downtown Hotel',
    price: '$22.30',
    status: 'completed',
    driverName: 'Miguel R.',
    driverRating: 4.7,
    driverImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  },
];

/**
 * RidesScreen component - Shows user's ride history
 * Displays list of past rides with details and allows filtering
 */
export default function RidesScreen() {
  const [activeTab, setActiveTab] = useState('past');

  // Render each ride history item
  const renderRideItem = ({ item }) => (
    <TouchableOpacity style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text style={styles.ridePrice}>{item.price}</Text>
      </View>
      
      <View style={styles.rideRoute}>
        <View style={styles.routePointContainer}>
          <View style={styles.originPoint} />
          <View style={styles.routeLine} />
          <View style={styles.destinationPoint} />
        </View>
        
        <View style={styles.routeDetails}>
          <Text style={styles.routeText}>{item.pickup}</Text>
          <Text style={styles.routeText}>{item.dropoff}</Text>
        </View>
      </View>
      
      <View style={styles.driverInfo}>
        <Image 
          source={{ uri: item.driverImage }} 
          style={styles.driverImage} 
        />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{item.driverName}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.driverRating}>{item.driverRating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsText}>Details</Text>
          <ChevronRight size={16} color="#0066CC" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>Past</Text>
        </TouchableOpacity>
      </View>
      
      {/* Ride History List */}
      {activeTab === 'past' ? (
        <FlatList
          data={rideHistory}
          renderItem={renderRideItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ridesList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No upcoming rides</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book a Ride</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#0066CC',
    fontWeight: '600',
  },
  ridesList: {
    paddingHorizontal: 20,
  },
  rideItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  rideRoute: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  routePointContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
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
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  routeText: {
    fontSize: 14,
    color: '#666666',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  driverDetails: {
    marginLeft: 12,
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRating: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    color: '#0066CC',
    marginRight: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});