import axios from "axios";

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

export async function loginApi(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      "/api/v1/auth/login",
      {
        email: credentials.email,
        password: credentials.password,
        // Route Handler menerima turnstileToken / captcha_token, lalu
        // meneruskan ke backend sebagai captcha_token.
        turnstileToken: credentials.captcha_token,
      },
      { headers: { "Content-Type": "application/json", Accept: "application/json" } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Backend menjawab dengan status error (401/422/dll).
      let errorMessage = "Login gagal. Periksa kembali email dan password.";
      const data = error.response.data;
      if (data?.message) errorMessage = data.message;
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0];
        if (Array.isArray(firstError) && firstError[0]) errorMessage = firstError[0];
      }
      throw new Error(errorMessage);
    }
    if (axios.isAxiosError(error) && error.request) {
      // Tidak ada respons sama sekali (server Next mati / jaringan client putus).
      throw new Error("Gagal terhubung ke server. Periksa koneksi Anda.");
    }
    throw new Error(error instanceof Error ? error.message : "Terjadi kesalahan.");
  }
}