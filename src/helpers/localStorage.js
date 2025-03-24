export const getAuthData = () => {
  let isAuthenticated = false;
  if (
    localStorage.getItem('accessToken') &&
    localStorage.getItem('accessToken').length
  ) {
    isAuthenticated = true;
  }
  return {
    isAuthenticated,
  };
};

export const setItem = (key, value) => localStorage.setItem(key, value);
export const getItem = (key) => localStorage.getItem(key);
export const removeItem = (key) => localStorage.removeItem(key);
