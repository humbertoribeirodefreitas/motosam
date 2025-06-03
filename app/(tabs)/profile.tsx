import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight, CreditCard, MapPin, Bell, Settings, CircleHelp as HelpCircle, Star } from 'lucide-react-native';

/**
 * ProfileScreen component - Shows user profile and settings
 * Displays user information, payment methods, saved places, and other settings
 */
export default function ProfileScreen() {
  // User information
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    rating: 4.8,
  };

  // Render a settings item with icon and chevron
  const SettingsItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsIconContainer}>
        {icon}
      </View>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{user.rating}</Text>
          </View>
          <Text style={styles.contactInfo}>{user.phone}</Text>
          <Text style={styles.contactInfo}>{user.email}</Text>
        </View>
      </View>
      
      {/* Account Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <SettingsItem 
          icon={<CreditCard size={20} color="#0066CC" />}
          title="Payment Methods"
          subtitle="Add or remove payment options"
          onPress={() => {/* Navigate to payment methods */}}
        />
        
        <SettingsItem 
          icon={<MapPin size={20} color="#FF9500" />}
          title="Saved Places"
          subtitle="Manage your saved locations"
          onPress={() => {/* Navigate to saved places */}}
        />
      </View>
      
      {/* Preferences */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <SettingsItem 
          icon={<Bell size={20} color="#5856D6" />}
          title="Notifications"
          subtitle="Manage your alerts and notifications"
          onPress={() => {/* Navigate to notifications */}}
        />
        
        <SettingsItem 
          icon={<Settings size={20} color="#666666" />}
          title="App Settings"
          subtitle="Language, privacy, and other settings"
          onPress={() => {/* Navigate to app settings */}}
        />
      </View>
      
      {/* Support */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingsItem 
          icon={<HelpCircle size={20} color="#34C759" />}
          title="Help Center"
          subtitle="Get help with your rides and orders"
          onPress={() => {/* Navigate to help center */}}
        />
      </View>
      
      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      
      {/* App Version */}
      <Text style={styles.versionText}>MotoSam v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  contactInfo: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  signOutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999999',
    marginBottom: 30,
  },
});