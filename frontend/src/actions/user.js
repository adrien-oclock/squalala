export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const register = () => ({
  type: REGISTER,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const updateLoginField = (newValue, name) => ({
  type: UPDATE_LOGIN_FIELD,
  value: newValue,
  name: name,
});

export const saveUserData = (isLogged, username, token) => ({
  type: SAVE_USER_DATA,
  isLogged: isLogged,
  username: username,
  token: token,
});
