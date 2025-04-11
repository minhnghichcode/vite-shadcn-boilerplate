import { AxiosError } from "axios";
import { api } from "@/lib/axios";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('scope', '');
      formData.append('client_id', 'string');
      formData.append('client_secret', 'string');
      
      const response = await api.post<AuthResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;
      
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const errorData = axiosError.response.data;
        
        // Handle specific API error format
        if (errorData && typeof errorData === 'object' && 'detail' in errorData) {
          throw new Error(errorData.detail as string);
        }
        
        if (statusCode === 401) {
          throw new Error("Incorrect email or password");
        } else if (statusCode === 403) {
          throw new Error("Account locked. Please contact support");
        }
      } else if (axiosError.request) {
        throw new Error("No response from server. Please check your connection");
      }
      
      throw new Error("Login failed. Please try again later");
    }
  },
  
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const errorData = axiosError.response.data;
        
        if (statusCode === 401) {
          throw new Error("Your session has expired");
        } else if (errorData && errorData.detail) {
          throw new Error(errorData.detail);
        }
      }
      
      throw new Error("Failed to get user profile");
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  }
};
