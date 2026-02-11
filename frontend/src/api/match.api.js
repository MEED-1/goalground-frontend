import api from './axios';

export const getMatches = async (params) => {
  const response = await api.get('/matches', { params });
  return response.data;
};

export const getMatchById = async (id) => {
  const response = await api.get(`/matches/${id}`);
  return response.data;
};

export const createMatch = async (data) => {
  const response = await api.post('/matches', data);
  return response.data;
};

export const joinMatch = async (id, position) => {
  const response = await api.post(`/matches/${id}/join`, { position });
  return response.data;
};

export const respondToJoinRequest = async (matchId, userId, status) => {
  const response = await api.put(`/matches/${matchId}/respond`, { userId, status });
  return response.data;
};