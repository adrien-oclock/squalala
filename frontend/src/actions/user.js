export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_FROM_STORAGE = 'LOG_IN_FROM_STORAGE';
export const LOG_OUT = 'LOG_OUT';
export const CHECK_MATCHING_PASSWORD = 'CHECK_MATCHING_PASSWORD';
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const SAVE_USERS = 'SAVE_USERS';

export const register = () => ({
  type: REGISTER,
});

export const logIn = () => ({
  type: LOG_IN,
});

export const logInFromStorage = () => ({
  type: LOG_IN_FROM_STORAGE,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const checkMatchingPassword = () => ({
  type: CHECK_MATCHING_PASSWORD,
});

export const updateLoginField = (newValue, name) => ({
  type: UPDATE_LOGIN_FIELD,
  value: newValue,
  name: name,
});

export const saveUserData = (isLogged, id, username, token) => ({
  type: SAVE_USER_DATA,
  isLogged: isLogged,
  id: id,
  username: username,
  token: token,
});

export const fetchUser = (userId, soundboardId) => ({
  type: FETCH_USER,
  userId: userId,
  soundboardId: soundboardId,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  user: user,
});

export const fetchUsers = (search, sortBy, order, page) => ({
  type: FETCH_USERS,
  search: search,
  sortBy: sortBy,
  order: order,
  page: page,
});

export const saveUsers = (users, pagination) => ({
  type: SAVE_USERS,
  users: users,
  pagination: pagination,
});
