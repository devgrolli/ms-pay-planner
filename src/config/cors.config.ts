import { CorsOptions } from 'cors';
console.log('BASE_URL_CORS', process.env.BASE_URL_CORS)
export const corsOptions: CorsOptions = {
  origin: process.env.BASE_URL_CORS ?? "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
