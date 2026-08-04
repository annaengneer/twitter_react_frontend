export default function TweetsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-5 py-8">
      <section className="w-full max-w-[620px] rounded-lg border border-[#d7e7fb] bg-white p-8 shadow-[0_18px_48px_rgba(101,119,153,0.14)]">
        <h1 className="mb-3 text-3xl font-bold text-[#26324d]">
          ツイート一覧
        </h1>
        <p className="leading-6 text-[#687695]">
          ログイン後に表示されるツイート一覧画面です。
        </p>
      </section>
    </main>
  );
}
