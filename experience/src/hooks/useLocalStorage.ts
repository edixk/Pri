import { useEffect, useState } from 'react';

import { safeReadJson, safeWriteJson } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = safeReadJson<T>(key);
    return stored === null ? initialValue : stored;
  });

  useEffect(() => {
    safeWriteJson(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}