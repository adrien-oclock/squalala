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

export const getSounboardById = (soundboards, id) => {
  if (id) {
    for (soundboard of soundboards) {
      if (soundboard.id == id) {
        return soundboard;
      }
    }
  }

  return soundboards[0];
}
