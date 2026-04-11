import { getStorageItem, setStorageItem } from '@/utils';
import React, { createContext, useEffect, useState } from 'react';


type AppContextType = {
  hideBalance: boolean;
  biometricEnabled: boolean;
  setHideBalance: (value: boolean) => void;
  setBiometricEnabled: (value: boolean) => void;
  loading: boolean;
};

export const AppContext = createContext<AppContextType >({} as AppContextType);
const BALANCE_STORAGE_KEY = '@hideBalance';
const BIOMETRIC_STORAGE_KEY = '@biometricEnabled';


export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [hideBalance, setHideBalanceState] = useState(false);
  const [biometricEnabled, setBiometricEnabledState] = useState(false);
  const [loading, setLoading] = useState(true);


  // 🔹 Load from storage on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const value = await getStorageItem(BALANCE_STORAGE_KEY);
     
        if (value !== null) {
          setHideBalanceState(value === 'true');
        }
        const biometricValue = await getStorageItem(BIOMETRIC_STORAGE_KEY);
        if (biometricValue !== null) {
          setBiometricEnabledState(biometricValue === 'true');
        }
        
      } catch (error) {
        console.log('Error loading hideBalance:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // 🔹 Update state + persist
  const setHideBalance = async (value: boolean) => {
    try {
      setHideBalanceState(value);
       await setStorageItem(BALANCE_STORAGE_KEY,  JSON.stringify(value));
    } catch (error) {
      console.log('Error saving hideBalance:', error);
    }
  };

  const setBiometricEnabled = async (value: boolean) => {
    try {
      setBiometricEnabledState(value);
       await setStorageItem(BIOMETRIC_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving biometricEnabled:', error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        hideBalance,
        biometricEnabled,
        setHideBalance,
        setBiometricEnabled,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
