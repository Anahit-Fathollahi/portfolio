// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800">خوش آمدید 🌟</h1>
      <p className="mt-4 text-lg text-gray-600">
        این یک پروژه نمونه با Next.js + TypeScript + Tailwind است.
      </p>
      <nav className="mt-8">
        <a
          href="/users"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
        >
          رفتن به Users List
        </a>
      </nav>
    </main>
  );
}
