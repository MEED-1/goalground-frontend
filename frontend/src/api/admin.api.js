import api from './axios';

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getAdminTerrains = async () => {
  const response = await api.get('/admin/terrains');
  return response.data;
};

export const getPlayerReport = async (params) => {
  const response = await api.get('/admin/players/report', { params });
  return response.data;
};