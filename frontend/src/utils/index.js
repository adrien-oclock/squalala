import axios from 'axios';

export const formatData = (data) => {
  const result = [];

  for (const elements of data) {
    const entity = elements[0];
    entity.rating = elements['rating'] ? parseFloat(elements['rating']) : 1;

    result.push(entity);
  }

  return result;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ]

  return date.getDay() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

export const getFirstSoundboardId = (soundboards) => {
  if (soundboards.length) {
    return parseInt(soundboards[0].id);
  }
  return null;
}

export const getSoundboardById = (soundboards, id) => {
  if (soundboards.length)
  {
    for (const soundboard of soundboards) {
      if (soundboard.id === id) {
        return soundboard;
      }
    }
  }

  return null;
}

export const api = axios.create({
  baseURL: 'http://localhost/tools/squalala/backend/public/api/v1/',
});
