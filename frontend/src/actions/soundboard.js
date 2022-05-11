export const FETCH_SOUNDBOARDS = 'FETCH_SOUNDBOARDS';
export const SAVE_SOUNDBOARDS = 'SAVE_SOUNDBOARDS';

export const fetchSoundboards = () => ({
  type: FETCH_SOUNDBOARDS,
});

export const saveSoundboards = (soundboards) => ({
  type: SAVE_SOUNDBOARDS,
  soundboards: soundboards,
});
