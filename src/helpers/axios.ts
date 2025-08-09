import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from "axios";
import { SERVER } from 'constants/server'

interface Instance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
}
const MIME_TYPE: IDictionary<ResponseType> = {
  JSON: 'json',
}

const instance: Instance = axios.create({
  baseURL: SERVER,
  timeout: 10000,
  withCredentials: true,
  responseType: MIME_TYPE.JSON
});

const handleResponse = (response: any) => {
  return response.data;
};

const handleError = (error: any) => {
  const { response, message } = error;
  return Promise.reject(response ? new Error(response.data.message || message) : error);
};

// 添加响应拦截器
instance.interceptors.response.use(handleResponse, handleError);

export default instance;
