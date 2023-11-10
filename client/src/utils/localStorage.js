export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const result = window.localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
  }
};
