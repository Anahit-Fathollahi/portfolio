import { Post } from "@/types/post";
import { User } from "@/types/user";
import { fetchFromApi } from "@/lib/api";
import PostDetailClient from "./PostDetailClient";

type PageProps = {
  params: { id: string };
};

// گرفتن کاربر از API
async function fetchUser(id: number): Promise<User | null> {
  if (!id) return null;
  try {
    return await fetchFromApi<User>(`/users/${id}`);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// گرفتن پست از API
async function fetchPost(id: string): Promise<Post | null> {
  if (!id) return null;
  try {
    return await fetchFromApi<Post>(`/posts/${id}`);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// صفحه جزئیات پست
export default async function PostDetailPage({ params }: PageProps) {
  const post = await fetchPost(params.id);

  // اگر پست پیدا نشد
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
