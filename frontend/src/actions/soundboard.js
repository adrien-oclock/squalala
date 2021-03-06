export const FETCH_SOUNDBOARD = 'FETCH_SOUNDBOARD';
export const SAVE_SOUNDBOARD = 'SAVE_SOUNDBOARD';
export const FETCH_SOUNDBOARDS = 'FETCH_SOUNDBOARDS';
export const SAVE_SOUNDBOARDS = 'SAVE_SOUNDBOARDS';
export const ADD_RATING = 'ADD_RATING';
export const ADD_SOUNDBOARD = 'ADD_SOUNDBOARD';
export const EDIT_SOUNDBOARD = 'EDIT_SOUNDBOARD';
export const DELETE_SOUNDBOARD = 'DELETE_SOUNDBOARD';
export const FETCH_SOUNDBOARDS_LASTS = 'FETCH_SOUNDBOARDS_LASTS';
export const SAVE_SOUNDBOARDS_LASTS = 'SAVE_SOUNDBOARDS_LASTS';
export const FETCH_SOUNDBOARDS_TRENDING = 'FETCH_SOUNDBOARDS_TRENDING';
export const SAVE_SOUNDBOARDS_TRENDING = 'SAVE_SOUNDBOARDS_TRENDING';

export const fetchSoundboard = (id) => ({
  type: FETCH_SOUNDBOARD,
  id: id,
});

export const saveSoundboard = (soundboard) => ({
  type: SAVE_SOUNDBOARD,
  soundboard: soundboard,
});

export const fetchSoundboards = (search, tags, sortBy, order, page) => ({
  type: FETCH_SOUNDBOARDS,
  search: search,
  tags: tags,
  sortBy: sortBy,
  order: order,
  page: page,
});

export const fetchSoundboardsLasts = () => ({
  type: FETCH_SOUNDBOARDS_LASTS,
});

export const fetchSoundboardsTrending = () => ({
  type: FETCH_SOUNDBOARDS_TRENDING,
});

export const saveSoundboards = (soundboards, pagination) => ({
  type: SAVE_SOUNDBOARDS,
  soundboards: soundboards,
  pagination: pagination,
});

export const saveSoundboardsLasts = (soundboards) => ({
  type: SAVE_SOUNDBOARDS_LASTS,
  soundboards: soundboards,
});

export const saveSoundboardsTrending = (soundboards) => ({
  type: SAVE_SOUNDBOARDS_TRENDING,
  soundboards: soundboards,
});

export const addSoundboard = (title, description, tags) => ({
  type: ADD_SOUNDBOARD,
  title: title,
  description: description,
  tags: tags,
});

export const editSoundboard = (id, title, description, tags) => ({
  type: EDIT_SOUNDBOARD,
  id: id,
  title: title,
  description: description,
  tags: tags,
});

export const deleteSoundboard = (id) => ({
  type: DELETE_SOUNDBOARD,
  id: id,
});

export const addRating = (rating, soundboardId) => ({
  type: ADD_RATING,
  rating: rating,
  soundboardId: soundboardId,
});
