import Axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'http://localhost:8000',
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> =>
  AXIOS_INSTANCE(config).then(({ data }) => data);

AXIOS_INSTANCE.interceptors.request.use(function (config) {
  const cookies = parseCookies(); // Retrieve cookies
  const accessToken = cookies?.accessToken;
  if (accessToken) {
    //@ts-ignore
    delete config.headers['Authorization'];
    //@ts-ignore
    config.headers['Authorization'] = `Token ${accessToken}`;
  }
  return config;
});
