import Axios, { AxiosRequestConfig } from "axios";
import { resData } from "./interface";
import { Toast } from "react-vant";

// 统一配置
const baseURL = "https://api.finbit.capital/api";
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
    let code = response.data.code;
    console.log(response.data);
    if (code !== 1) {
      Toast.info(response.data.msg || "请求失败");
    }
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
