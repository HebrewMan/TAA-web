export interface resData<T> {
  name: string;
  success?: boolean;
  data: T;
  code: number;
  message: string;
}
