import { Post } from "@/types/post";
import { User } from "@/types/user";
import { fetchFromApi } from "@/lib/api";
import PostDetailClient from "./PostDetailClient";
import { Metadata } from "next";

type PageProps = {
  params: { id: string }; // فقط برای readability، ولی actual type از Next.js گرفته میشه
};

// گرفتن کاربر از API
async function fetchUser(id: number): Promise<User | null> {
  if (!id) return null;
  try {
    return await fetchFromApi<User>(`/users/${id}`);
  } catch {
    return null;
  }
}

// گرفتن پست از API
async function fetchPost(id: string): Promise<Post | null> {
  if (!id) return null;
  try {
    return await fetchFromApi<Post>(`/posts/${id}`);
  } catch {
    return null;
  }
}

// صفحه جزئیات پست
export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 text-right">
        <p className="text-gray-700 bg-white px-6 py-4 rounded-xl shadow text-lg font-sans">
          <span role="img" aria-label="confused">
            😕
          </span>{" "}
          پستی پیدا نشد.
        </p>
      </main>
    );
  }

  const user = post.userId ? await fetchUser(Number(post.userId)) : null;

  return <PostDetailClient post={post} user={user} />;
}
