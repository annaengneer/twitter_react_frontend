import { apiRequest } from "./client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

type LoginSuccessResponse = {
  email: string;
};

type LoginErrorResponse = {
  error: string;
};

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResult> {
  const { response, data } = await apiRequest<LoginResponse>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "error" in data ? data.error : "ログインできませんでした。",
    };
  }

  return {
    ok: true,
    email: "email" in data ? data.email : email,
  };
}
