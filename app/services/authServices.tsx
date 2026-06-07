import axios, { AxiosError } from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
  captcha_token: string;
}

export interface SuccessLoginResponse {
  token: string;
  expires_at: number;
}

export interface MfaRequiredResponse {
  mfa_required: true;
  challenge_id: string;
}

export type LoginResponse = SuccessLoginResponse | MfaRequiredResponse;

export async function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
  '/api/v1/auth/login',
  {
    email: credentials.email,
    password: credentials.password,
    captcha_token: credentials.captcha_token, // <- sesuaikan dengan nama yang diharapkan backend
  },
  { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('HTTP Status:', error.response.status);
      console.error('Response body:', error.response.data);
      let errorMessage = 'Login gagal. Periksa kembali username dan password.';
      const data = error.response.data;
      if (data?.message) errorMessage = data.message;
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0];
        if (firstError && Array.isArray(firstError)) errorMessage = firstError[0];
      }
      throw new Error(errorMessage);
    } else if (axios.isAxiosError(error) && error.request) {
      console.error('No response:', error.request);
      throw new Error('Gagal terhubung ke server. Periksa koneksi atau CORS.');
    }
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
} 