interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const cache = {
  set: <T>(key: string, data: T, duration: number): void => {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: <T>(key: string, duration: number): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp }: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() - timestamp > duration;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
