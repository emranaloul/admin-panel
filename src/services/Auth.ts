import { AuthPayload } from 'types';
import { ApiService } from './APIService';

class AuthService extends ApiService {
  private path: string;
  constructor() {
    super();
    this.path = 'auth';
  }
  async login(username: string, password: string) {
    try {
      const response = await this.post<AuthPayload>(`${this.path}/login`, {
        username,
        password,
        role: 1,
      });
      return response;
    } catch (error: any | Error) {
      throw error.response.data;
    }
  }
}

export const authService = new AuthService();
