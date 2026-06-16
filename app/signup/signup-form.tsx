"use client";

import { SyntheticEvent, useMemo, useState } from "react";

type SignupFormValues = {
  email: string;
  password: string;
};

type SignupResult =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type SignupResponse = {
  email?: string;
  error?: string;
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    "http://localhost:8080"
  );
}

async function signup({ email, password }: SignupFormValues): Promise<SignupResult> {
  const response = await fetch(`${getApiBaseUrl()}/signup`, {
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
      message: data.error ?? "アカウントを作成できませんでした。",
    };
  }

  return {
    type: "success",
    message: `${data.email ?? email} に確認メールを送信しました。`,
  };
}

export default function SignupForm() {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupResult, setSignupResult] = useState<SignupResult>({
    type: "idle",
    message: "",
  });

  const canSubmit = useMemo(
    () =>
      formValues.email.trim().length > 0 &&
      formValues.password.length > 0 &&
      !isSubmitting,
    [formValues.email, formValues.password, isSubmitting],
  );

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSignupResult({ type: "idle", message: "" });

    const signupValues = {
      email: formValues.email.trim(),
      password: formValues.password,
    };

    try {
      const result = await signup(signupValues);
      setSignupResult(result);

      if (result.type === "success") {
        setFormValues({ email: "", password: "" });
      }
    } catch {
      setSignupResult({
        type: "error",
        message: "APIサーバーに接続できませんでした。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4.5 grid gap-2">
        <label className="font-bold" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="w-full rounded-md border border-[#cfd9de] bg-white px-3 py-3.5 text-[#0f1419] outline-none focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/15"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues((currentValues) => ({
              ...currentValues,
              email: event.target.value,
            }))
          }
          required
        />
      </div>

      <div className="mb-4.5 grid gap-2">
        <label className="font-bold" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full rounded-md border border-[#cfd9de] bg-white px-3 py-3.5 text-[#0f1419] outline-none focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/15"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formValues.password}
          onChange={(event) =>
            setFormValues((currentValues) => ({
              ...currentValues,
              password: event.target.value,
            }))
          }
          required
          minLength={8}
        />
      </div>

      <p className="-mt-1.5 mb-4.5 text-[13px] leading-[1.45] text-[#536471]">
        8文字以上で、大文字・小文字・数字・記号（! ? - _）をそれぞれ1文字以上含めてください。
      </p>

      <button
        className="w-full cursor-pointer rounded-full bg-[#1d9bf0] px-4.5 py-3.5 font-bold text-white hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:opacity-65"
        type="submit"
        disabled={!canSubmit}
      >
        {isSubmitting ? "作成中..." : "アカウントを作成"}
      </button>

      {signupResult.message ? (
        <p
          className={`mt-4.5 rounded-md p-3 leading-[1.45] ${
            signupResult.type === "success"
              ? "bg-[#ecfdf3] text-[#067647]"
              : "bg-[#fef3f2] text-[#b42318]"
          }`}
          role="status"
        >
          {signupResult.message}
        </p>
      ) : null}
    </form>
  );
}
