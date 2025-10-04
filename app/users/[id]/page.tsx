// app/users/[id]/page.tsx
import { User } from "@/types/user";
import { fetchFromApi } from "@/lib/api";
import { PageProps } from "next"; // ✅ اضافه کردن PageProps

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
      company: { name: string };
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
      website: data.website.startsWith("http") ? data.website : `https://${data.website}`,
      userId: data.userId,
      company: data.company,
    };
  } catch {
    return null;
  }
}

// ⚡️ استفاده از PageProps برای تایپ صحیح params
export default async function UserDetailPage({
  params,
}: PageProps<{ id: string }>) {
  const user = await fetchUser(params.id);

  if (!user)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        User not found.
      </p>
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {user.name}
        </h1>
        <p className="text-gray-600 text-center mt-2">
          <b>email: </b>
          {user.email}
        </p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            <b>Address:</b> {user.address.city}, {user.address.street},{" "}
            {user.address.suite}
          </p>
          <p>
            <b>Zipcode:</b> {user.address.zipcode}
          </p>
          <p>
            <b>Phone:</b> {user.phone}
          </p>
          <p>
            <b>Website:</b>{" "}
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              {user.website}
            </a>
          </p>
          <p>
            <b>Company:</b> {user.company?.name}
          </p>
        </div>
      </div>
    </main>
  );
}
