import axios from 'axios';

export const axiosGet = async <T>(url: string) => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const axiosPost = async <TResponse, TBody>(url: string, data: { arg: TBody }) => {
  const response = await axios.post<TResponse>(url, data.arg);
  return response.data;
};

export const axiosPut = async <TResponse, TBody>(url: string, data: { arg: TBody }) => {
  const response = await axios.put<TResponse>(url, data.arg);
  return response.data;
};
