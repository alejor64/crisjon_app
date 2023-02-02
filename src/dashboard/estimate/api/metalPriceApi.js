import axios from 'axios';

export const metalsPricesApi = axios.create({
  baseURL: 'https://api.metalpriceapi.com/v1/'
})