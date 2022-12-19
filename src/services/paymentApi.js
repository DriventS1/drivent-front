import api from './api';

export async function savePayment(body, token) {
  const response = await api.post('/payment/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return  response;
}
