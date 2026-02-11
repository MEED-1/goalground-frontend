import api from './axios';

export const createReview = async (data) => {
  const response = await api.post('/reviews', data);
  return response.data;
};

export const getTerrainReviews = async (terrainId) => {
  const response = await api.get(`/reviews/terrain/${terrainId}`);
  return response.data;
};