// app/users/[id]/page.tsx
import { User } from "@/types/user";
import { fetchFromApi } from "@/lib/api";

interface Props {
  params: { id: string };
}

async function fetchUser(id: string): Promise<User | null> {
  try {
    const data: {
      id: number;
      name: string;
      email: string;
      phone: string;
      username: string;
      address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
          lat: string;
          lng: string;
        };
    };
    website: string;
    userId: string;
    } = await fetchFromApi(`/users/${id}`);

    return {
      id: data.id.toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      username: data.username,
      address: data.address,
      website: data.website,
      userId: data.userId,
    };
  } catch {
    return null;
  }
}

export default async function UserDetailPage({ params }: Props) {
  const user = await fetchUser(params.id);

  if (!user) return <p className="p-6">User not found.</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h1>
      <p className="mt-2 text-gray-600">{user.email}</p>

      {/* نمایش آدرس */}
      <div className="mt-4 text-gray-700 text-center">
        <p><b>address: </b>
          {user.address.city}, {user.address.street}, {user.address.suite}
        </p>
        <p><b>zipcode:</b> {user.address.zipcode}</p>
        <p><b>phone:</b> {user.phone}</p>
        <p><b>website:</b> {user.website}</p>
      </div>
    </main>
  );
}
