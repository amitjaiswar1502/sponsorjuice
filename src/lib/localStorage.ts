import type { SavedCalculation } from './types';

const STORAGE_KEY = 'sponsorjuice_calculations';
const MAX_ENTRIES = 20;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getCalculations(): SavedCalculation[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCalculation[];
  } catch {
    return [];
  }
}

export function saveCalculation(entry: SavedCalculation): boolean {
  if (!isBrowser()) return false;
  try {
    const existing = getCalculations();
    const updated = [entry, ...existing.filter((e) => e.id !== entry.id)].slice(
      0,
      MAX_ENTRIES,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

export function deleteCalculation(id: string): boolean {
  if (!isBrowser()) return false;
  try {
    const updated = getCalculations().filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

export function isStorageAvailable(): boolean {
  if (!isBrowser()) return false;
  try {
    const testKey = '__sj_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
