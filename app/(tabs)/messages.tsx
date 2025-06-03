import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, ArrowRight } from 'lucide-react-native';

// Mock data for conversations
const conversations = [
  {
    id: '1',
    name: 'John Driver',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    lastMessage: 'I am 2 minutes away',
    time: '2:30 PM',
    unread: 1,
  },
  {
    id: '2',
    name: 'Sarah M.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    lastMessage: 'Thank you for the tip!',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Miguel R.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    lastMessage: 'Your ride has been completed',
    time: 'Jul 15',
    unread: 0,
  },
];

/**
 * MessagesScreen component - Shows user's conversations with drivers
 * Displays list of conversations and search functionality
 */
export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Render each conversation item
  const renderConversationItem = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        
        <View style={styles.conversationFooter}>
          <Text 
            style={styles.conversationMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter conversations based on search query
  const filteredConversations = searchQuery
    ? conversations.filter(convo => 
        convo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#666666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* Quick Action */}
      <TouchableOpacity style={styles.quickAction}>
        <View style={styles.quickActionIcon}>
          <ArrowRight size={16} color="#FFFFFF" />
        </View>
        <Text style={styles.quickActionText}>Contact my current driver</Text>
      </TouchableOpacity>
      
      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversationsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No conversations found
            </Text>
          </View>
        }
      />
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
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 16,
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 16,
  },
  quickActionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
  },
  conversationsList: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  conversationTime: {
    fontSize: 12,
    color: '#999999',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationMessage: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    paddingRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#0066CC',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
  },
});