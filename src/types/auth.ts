export interface LoginPayload {
  email:    string
  password: string
}

export interface RegisterPayload {
  name:     string
  email:    string
  age?:   number
  password: string
}

export interface AuthResponse {
  user:        UserResponse
  accessToken: string 
}

export interface UserResponse {
  id:          string
  name:        string
  email:       string
  age?:      string | null
  avatar?:     string | null
  createdAt:   string
  updatedAt:   string
}