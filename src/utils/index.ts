import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = (key: string, item: any) => {
  return AsyncStorage.setItem(key, item);
};

export const getStorageItem = async (key: string) => {
  return await AsyncStorage.getItem(key); // return raw string
};
export const removeStorageItem = (key: string) => {
  return AsyncStorage.removeItem(key);
};
