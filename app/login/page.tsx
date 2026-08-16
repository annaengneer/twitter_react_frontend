import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 items-start gap-8 bg-[#f8fbff] px-5 py-8 md:grid-cols-[minmax(280px,1fr)_minmax(320px,440px)] md:items-center md:gap-12 md:px-[clamp(24px,7vw,96px)] md:py-12">
      <section
        className="order-2 rounded-lg border border-[#d7e7fb] bg-white p-6 shadow-[0_18px_48px_rgba(101,119,153,0.14)] md:p-8"
        aria-label="ログイン"
      >
        <h2 className="mb-2 text-3xl font-bold leading-tight text-[#26324d]">
          ログイン
        </h2>
        <p className="mb-7 leading-6 text-[#687695]">
          登録済みのメールアドレスとパスワードでログインできます。
        </p>
        <LoginForm />
        <p className="mt-5 text-center text-sm text-[#687695]">
          アカウントをお持ちでない場合は{" "}
          <a className="font-bold text-[#3388c7] hover:underline" href="/signup">
            新規登録
          </a>
        </p>
      </section>

      <section
        className="order-1 max-w-[620px]"
        aria-labelledby="login-title"
      >
        <h1
          id="login-title"
          className="mb-6 text-[44px] font-bold leading-none text-[#26324d] md:text-[clamp(44px,7vw,76px)]"
        >
          Twitter Clone
        </h1>
        <p className="max-w-[520px] text-lg leading-[1.45] text-[#687695] md:text-[22px]">
          ログインすると、投稿一覧画面へ移動します。
        </p>
      </section>
    </main>
  );
}
