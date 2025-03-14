const isDev = import.meta.env.DEV;

export const devLog = (...args: unknown[]): void => {
  if (isDev) {
    console.log(...args);
  }
};

export const devError = (...args: unknown[]): void => {
  if (isDev) {
    console.error(...args);
  }
};

export const devWarn = (...args: unknown[]): void => {
  if (isDev) {
    console.warn(...args);
  }
};
