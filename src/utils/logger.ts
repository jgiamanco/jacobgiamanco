const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
  },
};

export const devWarn = (...args: unknown[]): void => {
  if (isDev) {
    console.warn(...args);
  }
};
