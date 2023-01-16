import api from './api';

export async function getGitHubUserData(codeParam) {
  const response = await api.post(
    `${process.env.REACT_APP_API_BASE_URL}/users/auth`, { codeParam });

  return response.data;
}
//
