import { AuthPayload, AuthResponse, GetAccountInfoResponse } from 'types';
import { ApiService } from './APIService';

class AuthService extends ApiService {
  private path: string;
  private refreshInterval: NodeJS.Timeout;
  private firstLand: boolean;
  constructor() {
    super(true);
    this.path = 'auth';
    this.refreshToken = this.refreshToken.bind(this);
    this.refreshInterval = setInterval(this.refreshToken, 1000);
    this.firstLand = true;
  }
  async login(email: string, password: string) {
    try {
      const response = await this.post<AuthPayload>(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
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
        returnSecureToken: true,
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
  saveTokens(payload: Omit<AuthPayload, 'displayName' | 'registered' | 'localId' | 'email'>) {
    localStorage.setItem('idToken', payload.idToken);
    localStorage.setItem('refreshToken', payload.refreshToken);
    localStorage.setItem('expiresIn', payload.expiresIn);
  }
  private async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      let expiresIn: string | number | null = localStorage.getItem('expiresIn');
      if (!expiresIn) {
        return;
      }
      expiresIn = +expiresIn;
      if (expiresIn > 0 && !this.firstLand) {
        localStorage.setItem('expiresIn', (expiresIn - 1).toString());
      } else {
        const response = await this.post<AuthResponse>(
          'https://securetoken.googleapis.com/v1/token',
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }
        );
        const payload = {
          idToken: response.id_token,
          refreshToken: response.refresh_token,
          expiresIn: response.expires_in,
        };
        this.saveTokens(payload);
        this.firstLand = false;
      }
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
