
export const getToken = () => {
  let token = localStorage.getItem('token');
  console.log('Token retrieved:', token);
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem('token');
};