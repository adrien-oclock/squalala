export const FETCH_SOUNDBOARDS = 'FETCH_SOUNDBOARDS';
export const SAVE_SOUNDBOARDS = 'SAVE_SOUNDBOARDS';

export const fetchSoundboards = (search, sortBy, order) => ({
  type: FETCH_SOUNDBOARDS,
  search: search,
  sortBy: sortBy,
  order: order,
});

export const saveSoundboards = (soundboards) => ({
  type: SAVE_SOUNDBOARDS,
  soundboards: soundboards,
});
