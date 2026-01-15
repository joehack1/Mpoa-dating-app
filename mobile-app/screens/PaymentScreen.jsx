import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PaymentScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('dating_token');
      await axios.post('http://localhost:5000/api/payments/process', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert('Success', 'Payment processed successfully!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Payment</Text>
      <Text style={styles.text}>To access premium features, please make a payment.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentScreen;