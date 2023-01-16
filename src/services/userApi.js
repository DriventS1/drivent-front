import api from './api';

export async function signUp(email, password) {
  const response = await api.post('/users', { email, password });
  return response.data;
}

export async function signUpWithGitHub(email, password) {
  const response = await api.post('/users/auth/sign-in', { email, password });
  return response.data;
}
//
