"use client";

import { SyntheticEvent, useMemo, useState } from "react";
import { signup, SignupFormValues, SignupResult } from "./signup-api";

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

  function handleFormValueChange(
    fieldName: keyof SignupFormValues,
    value: string,
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
  }

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
            handleFormValueChange("email", event.target.value)
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
            handleFormValueChange("password", event.target.value)
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
