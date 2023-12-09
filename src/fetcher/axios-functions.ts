import axios from 'axios';

export const axiosGet =
  <T>() =>
  async (url: string) => {
    const response = await axios.get<T>(url);
    return response.data;
  };

export const axiosPost =
  <T>() =>
  async (url: string, data: T) => {
    const response = await axios.post<T>(url, data);
    return response.data;
  };
