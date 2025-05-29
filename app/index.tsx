import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';

/**
 * Root index component - Redirects to auth or main app
 * This component handles initial routing based on authentication status
 */
export default function Index() {
  // In a real app, we would check if the user is authenticated
  const isAuthenticated = false;
  
  // Redirect to appropriate screen based on authentication status
  return isAuthenticated ? 
    <Redirect href="/(tabs)" /> : 
    <Redirect href="/auth/login" />;
}