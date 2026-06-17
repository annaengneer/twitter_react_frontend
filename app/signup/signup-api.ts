export type SignupFormValues = {
  email: string;
  password: string;
};

export type SignupResult =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type SignupSuccessResponse = {
  email: string;
};

type SignupErrorResponse = {
  error: string;
};

type EmptyResponse = Record<string, never>;

type SignupResponse =
  | SignupSuccessResponse
  | SignupErrorResponse
  | EmptyResponse;

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

export async function signup({
  email,
  password,
}: SignupFormValues): Promise<SignupResult> {
  const response = await fetch(`${apiBaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as SignupResponse;

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
