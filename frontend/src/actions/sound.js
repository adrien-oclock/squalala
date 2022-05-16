export const ADD_SOUND = 'ADD_SOUND';

export const addSound = (title, description, filename, position) => ({
  type: ADD_SOUND,
  title: title,
  description: description,
  filename: filename,
  position: position,
});
