const PRIMARY = process.env.API_PRIMARY_URL ?? "https://dengudbek.verni.yt";
const FALLBACK = process.env.API_FALLBACK_URL ?? "https://api.verni.yt";
const TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS ?? 8000);

// Urutan base yang dicoba. filter(Boolean) buang yang kosong.
const API_BASES = [PRIMARY, FALLBACK].filter(Boolean);

function isUpstreamDown(status: number): boolean {
  return (
    status === 502 ||
    status === 503 ||
    status === 504 ||
    (status >= 520 && status <= 530)
  );
}

export type FailoverResult = {
  response: Response;
  baseUsed: string;
};

export async function fetchWithFailover(
  path: string, // contoh: "/api/v1/auth/login"
  init: RequestInit,
): Promise<FailoverResult> {
  let lastError: unknown;

  for (const base of API_BASES) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(`${base}${path}`, {
        ...init,
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timer);

      // Upstream menjawab tapi melaporkan dirinya tidak siap -> coba base lain.
      if (isUpstreamDown(response.status)) {
        lastError = new Error(`Upstream ${base} balas ${response.status}`);
        continue;
      }

      // Sukses (atau 4xx yang sah) -> pakai jawaban ini.
      return { response, baseUsed: base };
    } catch (err) {
      // Network error / DNS gagal / connection refused / timeout (abort).
      clearTimeout(timer);
      lastError = err;
      continue;
    }
  }

  // Semua base gagal dihubungi.
  throw lastError ?? new Error("Semua API tidak dapat dihubungi.");
}