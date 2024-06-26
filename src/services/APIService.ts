// ApiService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiServiceConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

const API_URL = `${process.env.REACT_APP_API_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export class ApiService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        // ...(config.headers || {}),
      },
    });
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage with key 'token'
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (API_KEY) {
          config.params = {};
          config.params.key = API_KEY;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.get<T>(url, { params, ...config });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: any): never {
    console.error('API call error: ', error);

    if (error.response) {
      console.error('Response data: ', error.response.data);
      console.error('Response status: ', error.response.status);
      console.error('Response headers: ', error.response.headers);
    } else if (error.request) {
      console.error('Request data: ', error.request);
    } else {
      console.error('Error message: ', error.message);
    }

    throw error.response.data;
  }
}
