export const FETCH_SOUNDBOARD = 'FETCH_SOUNDBOARD';
export const SAVE_SOUNDBOARD = 'SAVE_SOUNDBOARD';
export const FETCH_SOUNDBOARDS = 'FETCH_SOUNDBOARDS';
export const SAVE_SOUNDBOARDS = 'SAVE_SOUNDBOARDS';
export const ADD_RATING = 'ADD_RATING';
export const ADD_SOUNDBOARD = 'ADD_SOUNDBOARD';

export const fetchSoundboard = () => ({
  type: FETCH_SOUNDBOARD,
});

export const saveSoundboard = (soundboard) => ({
  type: SAVE_SOUNDBOARD,
  soundboard: soundboard,
});

export const fetchSoundboards = (search, tags, sortBy, order) => ({
  type: FETCH_SOUNDBOARDS,
  search: search,
  tags: tags,
  sortBy: sortBy,
  order: order,
});

export const saveSoundboards = (soundboards) => ({
  type: SAVE_SOUNDBOARDS,
  soundboards: soundboards,
});

export const addSoundboard = (title, description, tags) => ({
  type: ADD_SOUNDBOARD,
  title: title,
  description: description,
  tags: tags,
});

export const addRating = (rating, soundboardId) => ({
  type: ADD_RATING,
  rating: rating,
  soundboardId: soundboardId,
});
