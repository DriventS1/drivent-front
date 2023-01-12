import api from './api';

export async function getDateActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivitiesWithLocal(token, dateId) {
  const response = await api.get(`/activities/${dateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postActivity(token, body) {
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
