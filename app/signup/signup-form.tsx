"use client";

import { FormEvent, useMemo, useState } from "react";

type SignupState =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<SignupState>({
    type: "idle",
    message: "",
  });

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0 && !isSubmitting,
    [email, password, isSubmitting],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ type: "idle", message: "" });

    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        email?: string;
        error?: string;
      };

      if (!response.ok) {
        setState({
          type: "error",
          message: data.error ?? "アカウントを作成できませんでした。",
        });
        return;
      }

      setState({
        type: "success",
        message: `${data.email ?? email.trim()} に確認メールを送信しました。`,
      });
      setEmail("");
      setPassword("");
    } catch {
      setState({
        type: "error",
        message: "APIサーバーに接続できませんでした。",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-[18px] grid gap-2">
        <label className="font-bold" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="w-full rounded-md border border-[#cfd9de] bg-white px-3 py-3.5 text-[#0f1419] outline-none focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/15"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="mb-[18px] grid gap-2">
        <label className="font-bold" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full rounded-md border border-[#cfd9de] bg-white px-3 py-3.5 text-[#0f1419] outline-none focus:border-[#1d9bf0] focus:ring-3 focus:ring-[#1d9bf0]/15"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
        />
      </div>

      <p className="-mt-1.5 mb-[18px] text-[13px] leading-[1.45] text-[#536471]">
        8文字以上で、大文字・小文字・数字・記号（! ? - _）をそれぞれ1文字以上含めてください。
      </p>

      <button
        className="w-full cursor-pointer rounded-full bg-[#1d9bf0] px-[18px] py-3.5 font-bold text-white hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:opacity-65"
        type="submit"
        disabled={!canSubmit}
      >
        {isSubmitting ? "作成中..." : "アカウントを作成"}
      </button>

      {state.message ? (
        <p
          className={`mt-[18px] rounded-md p-3 leading-[1.45] ${
            state.type === "success"
              ? "bg-[#ecfdf3] text-[#067647]"
              : "bg-[#fef3f2] text-[#b42318]"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
