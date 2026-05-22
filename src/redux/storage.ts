import AsyncStorage from '@react-native-async-storage/async-storage';

const reduxStorage = {
  setItem: (key: string, value: any) => {
    return AsyncStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

export default reduxStorage;
