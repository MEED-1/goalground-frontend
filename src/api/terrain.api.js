import api from './axios';

export const getTerrains = async (params) => {
  const response = await api.get('/terrains', { params });
  return response.data;
};

export const getTerrainById = async (id) => {
  const response = await api.get(`/terrains/${id}`);
  return response.data;
};

export const createTerrain = async (data) => {
  const response = await api.post('/terrains', data);
  return response.data;
};

export const updateTerrain = async (id, data) => {
  const response = await api.put(`/terrains/${id}`, data);
  return response.data;
};

export const deleteTerrain = async (id) => {
  const response = await api.delete(`/terrains/${id}`);
  return response.data;
};

export const getTerrainSlots = async (id, date) => {
  const response = await api.get(`/terrains/${id}/slots`, { params: { date } });
  return response.data;
};