export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';
export const CHECK_MATCHING_PASSWORD = 'CHECK_MATCHING_PASSWORD';
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const FETCH_USERS = 'FETCH_USERS';
export const SAVE_USERS = 'SAVE_USERS';

export const register = () => ({
  type: REGISTER,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const checkMatchingPassword = () => ({
  type: CHECK_MATCHING_PASSWORD,
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

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const saveUsers = (users) => ({
  type: SAVE_USERS,
  users: users,
});
