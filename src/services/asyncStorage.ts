import AsyncStorage from '@react-native-async-storage/async-storage';

// hook for asyncstorage
async function getStorageValue(key: string) {
  let value;
  try {
    let store = await AsyncStorage.getItem(key);
    value = store ? JSON.parse(store) : store;
    return value;
  } catch (e) {
    return null;
  }
}
async function updateStorage(key: string, newValue: any) {
  try {
    if (newValue === null) {
      await AsyncStorage.removeItem(key);
    } else {
      const value = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {}
}
async function saveValue(key: string, value: any) {
  try {
    if (value == null) {
      await removeValue(key);
      return {success: true};
    } else {
      console.log(value);
      await AsyncStorage.setItem(key, value);
      console.log('success');
      return {success: true};
    }
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return {error: e};
  }
}
async function saveMultiValues(values: any[]) {
  const mappedValues = values.map((v, i) => {
    return [i, v];
  });
  try {
    await AsyncStorage.multiSet(mappedValues);
    return {success: true};
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return {error: e};
  }
}
async function getValue(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return false;
  }
}

async function getMultiValues(keys: string[]) {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return false;
  }

  let value: any;
  values.forEach((v, i) => {
    value[v[0]] = v[1];
  });

  return value;
}

async function removeValue(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return {success: true};
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return {error: e};
  }
}

async function removeMultiValues(keys: string[]) {
  try {
    await AsyncStorage.multiRemove(keys);
    return {success: true};
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
    return {error: e};
  }
}

async function getAllKeys() {
  let keys: string[] = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
  }
  return keys;
}

async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('LOG_Async Storage access Failed', e);
  }
}

export {
  getStorageValue,
  updateStorage,
  saveValue,
  saveMultiValues,
  getValue,
  getMultiValues,
  removeValue,
  removeMultiValues,
  getAllKeys,
  clearAll,
};
