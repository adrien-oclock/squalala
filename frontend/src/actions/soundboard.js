export const FETCH_SOUNDBOARDS = 'FETCH_SOUNDBOARDS';
export const SAVE_SOUNDBOARDS = 'SAVE_SOUNDBOARDS';

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
