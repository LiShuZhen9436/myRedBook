import axios, {AxiosResponse} from 'axios';
import apiConfig from '../api/api';

const instance = axios.create({
  baseURL: 'http://192.168.0.102:7001',
  timeout: 10 * 1000,
});

instance.interceptors.response.use(
  response => response,
  error => {
    // 18751609896
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
        // 服务端报错
      } else if (status === 400) {
        // 接口参数异常
      } else if (status === 401) {
        // 登陆信息过期，需要重新登陆
      } else {
        // 其它错误类型，统一按照接口报错处理
      }
    } else {
      // 网络异常
    }
    return Promise.reject(error);
  },
);

export const request = (
  name: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (apiConfig as any)[name];
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

const get = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  console.log('url:', url, 'params:', params);
  return instance.get(url, {
    params,
  });
};

const post = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};
