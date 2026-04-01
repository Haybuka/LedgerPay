import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect, useState } from 'react';

export const useBiometricAuth = (autoRun = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setError('No biometric hardware');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        setError('No biometrics enrolled');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔥 Run automatically on mount (app load)

  useEffect(() => {
  if (!autoRun) {
    setIsAuthenticated(true); // 🔥 bypass auth
    return;
  }

  authenticate();
}, [autoRun, authenticate]);

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate, // manual trigger if needed
  };
};