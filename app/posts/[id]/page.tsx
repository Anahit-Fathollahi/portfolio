import { Post } from "@/types/post";
import { User } from "@/types/user";
import { fetchFromApi } from "@/lib/api";
import PostDetailClient from "./PostDetailClient";

async function fetchUser(id: number): Promise<User | null> {
  try {
    return await fetchFromApi<User>(`/users/${id}`);
  } catch {
    return null;
  }
}

async function fetchPost(id: string): Promise<Post | null> {
  try {
    return await fetchFromApi<Post>(`/posts/${id}`);
  } catch {
    return null;
  }
}

// ✅ در Next.js 15، PageProps وجود ندارد — پس به‌صورت دستی تایپ params را تعریف می‌کنیم
interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await fetchPost(params.id);

  if (!post)
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-700 bg-white px-6 py-4 rounded-xl shadow text-lg">
          😕 پستی پیدا نشد.
        </p>
      </main>
    );

  const user = await fetchUser(Number(post.userId));

  return <PostDetailClient post={post} user={user} />;
}
