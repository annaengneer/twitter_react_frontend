"use client";

import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import { signup, SignupRequest, SignupResult } from "../../lib/api/signup";

type SignupFormValues = SignupRequest;
type SignupFormState = { type: "idle"; message: "" } | SignupResult;

export default function SignupForm() {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupResult, setSignupResult] = useState<SignupFormState>({
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

      <div className="mb-4.5 grid gap-2">
        <label className="font-bold" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full rounded-md border border-[#d7e7fb] bg-[#fbfdff] px-3 py-3.5 text-[#26324d] outline-none focus:border-[#7cc7ff] focus:ring-3 focus:ring-[#a7d8ff]/35"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formValues.password}
          onChange={handleFormValueChange}
          required
          minLength={8}
        />
      </div>

      <p className="-mt-1.5 mb-4.5 text-[13px] leading-[1.45] text-[#687695]">
        8文字以上で、大文字・小文字・数字・記号（! ? - _）をそれぞれ1文字以上含めてください。
      </p>

      <button
        className="w-full cursor-pointer rounded-full bg-[#8fcfff] px-4.5 py-3.5 font-bold text-[#26324d] hover:bg-[#78c3fa] disabled:cursor-not-allowed disabled:opacity-65"
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
