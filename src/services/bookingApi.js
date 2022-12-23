import api from './api';

export async function getBookings({ token, hotelId }) {
  const response = await api.get(`/hotels/${hotelId}/vacancies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
