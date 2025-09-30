// app/users/page.tsx
import { User } from "@/types/user";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const data = await res.json();

  const users: User[] = data.map((u: User) => ({
    id: u.id.toString(),
    name: u.name,
    email: u.email,
  }));

  return users;
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow"
          >
            <div>
              <h2 className="font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
