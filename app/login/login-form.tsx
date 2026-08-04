"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import { login, LoginRequest } from "../../lib/api/login";

type LoginFormValues = LoginRequest;
type LoginFormState =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function idleLoginFormState(): LoginFormState {
  return { type: "idle", message: "" };
}

export default function LoginForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginResult, setLoginResult] =
    useState<LoginFormState>(idleLoginFormState());

  const canSubmit = useMemo(
    () =>
      formValues.email.trim().length > 0 &&
      formValues.password.length > 0 &&
      !isSubmitting,
    [formValues.email, formValues.password, isSubmitting],
  );

  function handleFormValueChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name !== "email" && name !== "password") {
      return;
    }

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setLoginResult(idleLoginFormState());

    const loginValues = {
      email: formValues.email.trim(),
      password: formValues.password,
    };

    try {
      const result = await login(loginValues);

      if (!result.ok) {
        setLoginResult({
          type: "error",
          message: result.error || "ログインできませんでした。",
        });
        return;
      }

      setLoginResult({
        type: "success",
        message: `${result.email} でログインしました。`,
      });
      router.push("/tweets");
    } catch {
      setLoginResult({
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
          className="w-full rounded-md border border-[#d7e7fb] bg-[#fbfdff] px-3 py-3.5 text-[#26324d] outline-none focus:border-[#7cc7ff] focus:ring-3 focus:ring-[#a7d8ff]/35"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formValues.email}
          onChange={handleFormValueChange}
          required
        />
      </div>

      <div className="mb-5 grid gap-2">
        <label className="font-bold" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full rounded-md border border-[#d7e7fb] bg-[#fbfdff] px-3 py-3.5 text-[#26324d] outline-none focus:border-[#7cc7ff] focus:ring-3 focus:ring-[#a7d8ff]/35"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formValues.password}
          onChange={handleFormValueChange}
          required
        />
      </div>

      <button
        className="w-full cursor-pointer rounded-full bg-[#8fcfff] px-4.5 py-3.5 font-bold text-[#26324d] hover:bg-[#78c3fa] disabled:cursor-not-allowed disabled:opacity-65"
        type="submit"
        disabled={!canSubmit}
      >
        {isSubmitting ? "ログイン中..." : "ログイン"}
      </button>

      {loginResult.message ? (
        <p
          className={`mt-4.5 rounded-md p-3 leading-[1.45] ${
            loginResult.type === "success"
              ? "bg-[#ecfdf3] text-[#067647]"
              : "bg-[#fef3f2] text-[#b42318]"
          }`}
          role="status"
        >
          {loginResult.message}
        </p>
      ) : null}
    </form>
  );
}
