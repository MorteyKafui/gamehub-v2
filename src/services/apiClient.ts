import { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

const AxiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "b7caf340ab2f4dd0827d2a1ef96d3033",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return AxiosInstance.get<FetchResponse<T>>(this.endpoint, config).then(
      res => res.data
    );
  };

  get = (id: number | string) => {
    return AxiosInstance.get<T>(this.endpoint + "/" + id).then(res => res.data);
  };
}

export default APIClient;
