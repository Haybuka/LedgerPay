import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const FingerPrintUsage = () => {
  const authenticateUser = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) return;

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) return;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        console.log('Authenticated ✅');
      } else {
        console.log('Failed ❌', result);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <View>
      <Text>Welcome to LedgerPay</Text>
    </View>
  );
};

export default FingerPrintUsage;