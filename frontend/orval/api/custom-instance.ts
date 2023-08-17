import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'http://localhost:8000',
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> =>
  AXIOS_INSTANCE(config).then(({ data }) => data);

export default customInstance;
