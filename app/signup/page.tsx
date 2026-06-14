import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 items-start gap-8 px-5 py-8 md:grid-cols-[minmax(280px,1fr)_minmax(320px,440px)] md:items-center md:gap-12 md:px-[clamp(24px,7vw,96px)] md:py-12">
      <section
        className="order-2 rounded-lg border border-[#cfd9de] bg-white p-6 shadow-[0_16px_40px_rgba(15,20,25,0.08)] md:order-1 md:p-8"
        aria-label="アカウント作成"
      >
        <h2 className="mb-2 text-3xl font-bold leading-tight">
          アカウントを作成
        </h2>
        <p className="mb-7 leading-6 text-[#536471]">
          メールアドレスとパスワードを入力して、利用を開始できます。
        </p>
        <SignupForm />
      </section>

      <section
        className="order-1 max-w-[620px] md:order-2 md:justify-self-end"
        aria-labelledby="signup-title"
      >
        <div
          className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[#0f1419] text-[32px] font-bold text-white"
          aria-hidden="true"
        >
          X
        </div>
        <h1
          id="signup-title"
          className="mb-6 text-[44px] font-bold leading-none md:text-[clamp(44px,7vw,76px)]"
        >
          Twitter Clone
        </h1>
        <p className="max-w-[520px] text-lg leading-[1.45] text-[#536471] md:text-[22px]">
          気になる人をフォローして、投稿や会話をタイムラインで楽しめます。
        </p>
      </section>
    </main>
  );
}
