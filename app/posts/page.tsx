// app/posts/page.tsx
import { Post } from "@/types/post";
import { fetchFromApi } from "@/lib/api";

async function fetchPosts(): Promise<Post[]> {
  return fetchFromApi<Post[]>("/posts?_limit=10");
}

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Posts List</h1>
      <div className="mt-4 grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-white p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-2 text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
