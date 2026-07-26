const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

export async function apiRequest<TResponse>(
  path: string,
  options?: RequestInit,
): Promise<{ response: Response; data: TResponse | Record<string, never> }> {
  const response = await fetch(`${apiBaseUrl}${path}`, options);
  const data = (await response.json().catch(() => ({}))) as
    | TResponse
    | Record<string, never>;

  return { response, data };
}
