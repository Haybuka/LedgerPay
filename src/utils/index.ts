import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = (key: string, item: any) => {
  return AsyncStorage.setItem(key, item);
};

export const getStorageItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : false;
};

export const removeStorageItem = (key: string) => {
  return AsyncStorage.removeItem(key);
};
