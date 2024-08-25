import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(request => {
  console.log('Request', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    params: request.params,
    data: request.data,
  });
  return request;
}, error => {
  console.error('Request Error', error);
  return Promise.reject(error);
});

export default api;
