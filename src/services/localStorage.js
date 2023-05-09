export const getLocalStorage = (key) => {
  // if (typeof key === 'string') {
  //   const localItems = JSON.parse(localStorage.getItem(key));
  //   return localItems;
  // }
  const localItems = JSON.parse(localStorage.getItem(key));
  return localItems;
};

export const setLocalStorage = (key, value) => {
  if (typeof value !== 'string') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
