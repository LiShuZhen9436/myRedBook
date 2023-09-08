import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const load = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const clear = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export {save, load, remove, clear};
