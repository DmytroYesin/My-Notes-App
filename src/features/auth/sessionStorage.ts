import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const memoryStore = new Map<string, string>();

function getWebStorage() {
  try {
    if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
      return globalThis.localStorage;
    }
  } catch {
    // Ignore and use in-memory fallback.
  }

  return null;
}

async function canUseSecureStore() {
  if (Platform.OS === 'web') {
    return false;
  }

  try {
    return typeof SecureStore.getItemAsync === 'function' && (await SecureStore.isAvailableAsync());
  } catch {
    return false;
  }
}

export async function getStoredValue(key: string) {
  if (await canUseSecureStore()) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      // Ignore and use fallback.
    }
  }

  const webStorage = getWebStorage();
  if (webStorage) {
    try {
      return webStorage.getItem(key);
    } catch {
      // Ignore and use in-memory fallback.
    }
  }

  return memoryStore.get(key) ?? null;
}

export async function setStoredValue(key: string, value: string) {
  if (await canUseSecureStore()) {
    try {
      await SecureStore.setItemAsync(key, value);
      return;
    } catch {
      // Ignore and use fallback.
    }
  }

  const webStorage = getWebStorage();
  if (webStorage) {
    try {
      webStorage.setItem(key, value);
      return;
    } catch {
      // Ignore and use in-memory fallback.
    }
  }

  memoryStore.set(key, value);
}

export async function removeStoredValue(key: string) {
  if (await canUseSecureStore()) {
    try {
      await SecureStore.deleteItemAsync(key);
      return;
    } catch {
      // Ignore and use fallback.
    }
  }

  const webStorage = getWebStorage();
  if (webStorage) {
    try {
      webStorage.removeItem(key);
      return;
    } catch {
      // Ignore and use in-memory fallback.
    }
  }

  memoryStore.delete(key);
}

