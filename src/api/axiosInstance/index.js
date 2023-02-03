import axios from 'axios';
import { API_URL, TOKEN } from '../../utils/constants';

export const apiInstance = axios.create({
  baseURL: API_URL
});

apiInstance.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN);
  config.headers = {
    ...config.headers,
    'Authorization': token
  }
  return config;
})