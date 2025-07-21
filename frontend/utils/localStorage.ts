import { Property } from '@/types';

const STORAGE_KEY = 'flats';

export function getFlatsFromStorage(): Property[] {
  if (typeof window === 'undefined') return []; // SSR guard
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveFlatToStorage(flat: Property) {
  const existing = getFlatsFromStorage();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, flat]));
}
