export const setLocalStorageItem = (key,data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearLocalStorageItem = (key) => {
    return localStorage.removeItem(key);
  };
