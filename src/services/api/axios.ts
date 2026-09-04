import axios, {
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios'
import { queryClient } from "@/lib/queryClient";
import { authKeys } from "@/lib/queryKeys";


const API_BASE = import.meta.env.VITE_APP_URL ?? 'http://localhost:3000/v1'

export const api = axios.create({
  baseURL:         API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject:  (reason?: unknown)  => void
}> = []

function processQueue(error: AxiosError | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(undefined)
  })
  failedQueue = []
}

function forceLogout() {
  queryClient.setQueryData(authKeys.me, null);
  queryClient.clear(); 
  window.location.href = "/login";
}

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    
    const isAuthEndpoint = ['/auth/refresh-token', '/auth/login', '/auth/logout'].some(
      (path) => originalRequest?.url?.includes(path)
    );

    if (isAuthEndpoint) {
      if (originalRequest?.url?.includes('/auth/refresh-token')) {
        forceLogout();
      }
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await api.post('/auth/refresh-token')
        processQueue(null)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError)
        forceLogout();
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api