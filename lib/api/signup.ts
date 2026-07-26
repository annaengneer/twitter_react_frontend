import { apiRequest } from "./client";

export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResult =
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type SignupSuccessResponse = {
  email: string;
};

type SignupErrorResponse = {
  error: string;
};

type SignupResponse = SignupSuccessResponse | SignupErrorResponse;

export async function signup({
  email,
  password,
}: SignupRequest): Promise<SignupResult> {
  const { response, data } = await apiRequest<SignupResponse>("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    return {
      type: "error",
      message:
        "error" in data ? data.error : "アカウントを作成できませんでした。",
    };
  }

  return {
    type: "success",
    message: `${"email" in data ? data.email : email} に確認メールを送信しました。`,
  };
}
