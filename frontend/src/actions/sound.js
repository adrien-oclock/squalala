export const ADD_SOUND = 'ADD_SOUND';
export const EDIT_SOUND = 'EDIT_SOUND';
export const DELETE_SOUND = 'DELETE_SOUND';

export const addSound = (title, description, fileData, position) => ({
  type: ADD_SOUND,
  title: title,
  description: description,
  fileData: fileData,
  position: position,
});

export const editSound = (id, title, description, fileData, position) => ({
  type: EDIT_SOUND,
  id: id,
  title: title,
  description: description,
  fileData: fileData,
  position: position,
});

export const deleteSound = (id) => ({
  type: DELETE_SOUND,
  id: id,
});
