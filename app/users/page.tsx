import { fetchFromApi } from "@/lib/api";
import { User } from "@/types/user";

async function fetchUsers(): Promise<User[]> {
  const data = await fetchFromApi<User[]>("/users");

  return data.map(u => ({
    ...u,
    id: u.id.toString(),
    website: u.website.startsWith("http") ? u.website : `https://${u.website}`
  }));
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Users List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <div
            key={user.id}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <a
              href={`/users/${user.id}`}
              className="text-blue-700 font-semibold text-lg hover:underline"
              aria-label={`Go to ${user.name}'s profile`}
            >
              {user.name}
            </a>
            <p className="text-gray-600 text-sm mt-1 break-words">{user.email}</p>
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-2 hover:text-blue-800 hover:underline break-words"
              aria-label={`Visit ${user.name}'s website`}
            >
              {user.website}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
