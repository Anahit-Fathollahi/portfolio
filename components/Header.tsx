// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-50 p-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">نمونه‌کار JSONPlaceholder</h1>
        <nav className="flex space-x-4">
          <Link
            href="/users"
            className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
          >
            Users
          </Link>
          <Link
            href="/posts"
            className="rounded-xl bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
          >
            Posts
          </Link>
          <Link
            href="/todos"
            className="rounded-xl bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700"
          >
            Todos
          </Link>
        </nav>
      </div>
    </header>
  );
}
