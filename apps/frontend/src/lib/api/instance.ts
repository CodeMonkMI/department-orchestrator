import axios from "axios";
import { authToken } from "../token/AuthToken";

const baseUrl = "http://localhost:5000/api/v1";

export class Axios {
  baseUrl: string = baseUrl;
  token: string = authToken.get();
  axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
    });
  }
}
