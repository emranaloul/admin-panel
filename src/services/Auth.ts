import {
  AuthPayload,
  AuthResponse,
  GetAccountInfoResponse,
  LoginResponse,
  SignupResponse,
} from 'types';
import { ApiService } from './APIService';
import { AxiosRequestConfig } from 'axios';

class AuthService extends ApiService {
  private path: string;
  // private refreshInterval: NodeJS.Timeout;
  // private firstLand: boolean;
  constructor() {
    super();
    this.path = '/auth';
    // this.refreshToken = this.refreshToken.bind(this);
    // this.refreshInterval = setInterval(this.refreshToken, 1000);
    // this.firstLand = true;
  }
  async login(email: string, password: string) {
    try {
      const basic = btoa(`${email}:${password}`);
      const headers: AxiosRequestConfig['headers'] = {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/json',
      };
      const response = await this.post<LoginResponse>(`${this.path}/signin`, undefined, {
        headers,
      });
      this.saveTokens(response.token);
      return response;
    } catch (error: any | Error) {
      throw error;
    }
  }
  async signup(email: string, password: string) {
    try {
      const response = await this.post<SignupResponse>(`${this.path}/sign-up`, {
        email,
        password,
      });
      this.saveTokens(response.token);
      return response;
    } catch (error: any | Error) {
      throw error;
    }
  }
  async getUserData() {
    const response = await this.get<GetAccountInfoResponse>(`${this.path}/my-profile`);
    return response.data;
  }

  async logout() {
    await this.post(`${this.path}/logout`);
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  saveTokens(token: string) {
    localStorage.setItem('token', token);
  }
}

export const authService = new AuthService();
