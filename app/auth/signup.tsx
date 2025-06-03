import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, ChevronLeft, ArrowRight } from 'lucide-react-native';

/**
 * SignupScreen component - Handles user registration
 * Allows users to create a new account
 */
export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number format
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  // Handle signup
  const handleSignup = () => {
    let isValid = true;

    // Validate full name
    if (!fullName) {
      setNameError('Full name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate phone
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // If all validations pass, proceed with signup
    if (isValid) {
      // In a real app, we would make an API call to register the user
      console.log('Signing up with:', { fullName, email, phone, password });
      
      // Navigate to the main app (tabs)
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333333" />
        </TouchableOpacity>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to start your MotoSam journey</Text>
        </View>
        
        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, nameError && styles.inputError]}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          
          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={[styles.input, phoneError && styles.inputError]}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          </View>
          
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={togglePasswordVisibility}
              >
                {showPassword ? 
                  <EyeOff size={20} color="#666666" /> : 
                  <Eye size={20} color="#666666" />
                }
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          
          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={[styles.passwordContainer, confirmPasswordError && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? 
                  <EyeOff size={20} color="#666666" /> : 
                  <Eye size={20} color="#666666" />
                }
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>
        </View>
        
        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
        
        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  passwordContainer: {
    backgroundColor: '#F5F5F5',
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  signupButton: {
    backgroundColor: '#0066CC',
    height: 54,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  termsLink: {
    color: '#0066CC',
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
  },
});