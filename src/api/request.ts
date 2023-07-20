import Axios, { AxiosRequestConfig } from "axios";
import { resData } from "./interface";

// 统一配置
const baseURL = "https://api.theanimalage.com/";
export const service = Axios.create({
  baseURL,
  responseType: "json",
  timeout: 600000,
});

service.interceptors.request.use((config) => {
  return config;
});

service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default function request<Res = any, Q = any>(
  req: AxiosRequestConfig & {
    data?: Q;
  }
) {
  return service(req).then(
    (res) => {
      return res.data as resData<Res>;
    },
    (res) => {
      return Promise.reject((res.data || res) as resData<Res>);
    }
  );
}
