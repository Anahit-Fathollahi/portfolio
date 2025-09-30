// app/posts/[id]/page.tsx
import { Post } from "@/types/post";
import { fetchFromApi } from "@/lib/api";

interface Props {
  params: { id: string };
}

async function fetchPost(id: string): Promise<Post | null> {
  try {
    return await fetchFromApi<Post>(`/posts/${id}`);
  } catch {
    return null;
  }
}

export default async function PostDetailPage({ params }: Props) {
  const post = await fetchPost(params.id);

  if (!post) return <p className="p-6">Post not found.</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.body}</p>
      <p className="mt-4 text-gray-700">{post.userId}</p>
    </main>
  );
}
