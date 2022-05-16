import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost/tools/squalala/backend/public/api/v1/',
});

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
  if (soundboards.length) {
    for (const soundboard of soundboards) {
      if (id === null) {
        return soundboard;
      }
      if (soundboard.id === id) {
        return soundboard;
      }
    }
  }

  return null;
}

export const getRating = (soundboard) => {
  let rating = 1;
  if (soundboard.likes !== undefined && soundboard.likes.length > 0) {
    const scores = [];
    for (const like of soundboard.likes) {
      scores.push(like.score);
    }

    rating = scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  return rating;
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
