import axios from 'axios';

import { API_URL } from './config';

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((req : any) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`;
  }

  return req;
});

export const signIn = (formData : any) => API.post('/user/signin', formData);
export const signUp = (formData : any) => API.post('/user/signup', formData);