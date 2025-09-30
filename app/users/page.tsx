import { fetchFromApi } from "@/lib/api";
import { enableFetchLogger } from "@/lib/fetchLogger";
import { User } from "@/types/user";

async function fetchUsers(): Promise<User[]> {
  const data: { id: number; name: string; email: string; phone:string; username:string ;
  address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      },
    };
    website:string

  }[] = await fetchFromApi("/users");
  return data.map((u) => ({
    id: u.id.toString(),
    name: u.name,
    email: u.email,
    phone: u.phone,
    username: u.username,
    address: u.address,
    website: u.website,
  }));
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 rounded-xl bg-gray-50 p-4 shadow">
            <div>
              <a href={`/users/${user.id}`} className="text-blue-600 hover:underline">{user.name}</a>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
