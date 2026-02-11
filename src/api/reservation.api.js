import api from './axios';

export const createReservation = async (data) => {
  const response = await api.post('/reservations', data);
  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get('/reservations/my');
  return response.data;
};

export const getTerrainReservations = async (terrainId) => {
  const response = await api.get(`/reservations/terrain/${terrainId}`);
  return response.data;
};