import { AuthPayload, GetAccountInfoResponse } from 'types';
import { ApiService } from './APIService';

class AuthService extends ApiService {
  private path: string;
  constructor() {
    super();
    this.path = 'auth';
  }
  async login(email: string, password: string) {
    try {
      const response = await this.post<AuthPayload>(`accounts:signInWithPassword`, {
        email,
        password,
        // role: 1,
      });
      this.saveTokens(response);
      return response;
    } catch (error: any | Error) {
      throw error;
    }
  }
  async signup(email: string, password: string) {
    try {
      const response = await this.post<AuthPayload>(`accounts:signUp`, {
        email,
        password,
        // role: 1,
      });
      this.saveTokens(response);
      return response;
    } catch (error: any | Error) {
      throw error;
    }
  }
  async getUserData() {
    try {
      const token = this.getToken();
      if (token) {
        const response = await this.post<GetAccountInfoResponse>(`accounts:lookup`, {
          idToken: this.getToken(),
        });
        return response.users[0];
      } else {
        return;
      }
    } catch (err) {
      throw err;
    }
  }
  getToken() {
    return localStorage.getItem('idToken');
  }
  saveTokens(payload: AuthPayload) {
    localStorage.setItem('idToken', payload.idToken);
    localStorage.setItem('refreshToken', payload.refreshToken);
  }
}

export const authService = new AuthService();
