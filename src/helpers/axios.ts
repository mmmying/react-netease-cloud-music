import axios from "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  responseType: "json"
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
