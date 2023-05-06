export const getLocalStorage = (key) => {
  if (typeof key !== 'string') {
    const localItems = localStorage.getItem(JSON.parse(key));
    return localItems;
  }
  const localItems = localStorage.getItem(key);
  return localItems;
};

export const setLocalStorage = (key, value) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
