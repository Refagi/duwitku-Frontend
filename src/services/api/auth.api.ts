import api from './axios'
import type {
  AuthResponse, LoginPayload,
  RegisterPayload, UserResponse,
} from '@/types/auth'
import type { ApiResponse } from '@/types/api'

export const authApi = {

  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthResponse>>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<AuthResponse>>('/auth/register', payload),

  logout: () =>
    api.post<ApiResponse>('/auth/logout'),

  refreshToken: () =>
    api.post<ApiResponse>('/auth/refresh-token'),


  getMe: () =>
    api.get<ApiResponse<UserResponse>>('/auth/me'),

//   updateProfile: (payload: UpdateProfilePayload) =>
//     api.patch<ApiResponse<UserResponse>>('/auth/me', payload),
}