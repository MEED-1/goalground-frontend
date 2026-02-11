import api from './axios';

export const submitRating = async (data) => {
  const response = await api.post('/ratings', data);
  return response.data;
};

export const getPlayerRatings = async (playerId) => {
  const response = await api.get(`/ratings/player/${playerId}`);
  return response.data;
};