import api from './axios';

export const getFavorites = async () => {
  const response = await api.get('/favorites/my');
  return response.data;
};

export const addFavorite = async (terrainId) => {
  const response = await api.post('/favorites/add', { terrainId });
  return response.data;
};

export const removeFavorite = async (terrainId) => {
  const response = await api.delete('/favorites/remove', { data: { terrainId } });
  return response.data;
};