// app/posts/page.tsx
import { Post } from "@/types/post";
import { fetchFromApi } from "@/lib/api";

type Props = {
  searchParams: { page?: string };
};

async function fetchPosts(page: number, limit: number): Promise<Post[]> {
  return fetchFromApi<Post[]>(`/posts?_page=${page}&_limit=${limit}`);
}

export default async function PostsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 21; // چون می‌خوای ۳ ستون داشته باشی

  const posts = await fetchPosts(currentPage, postsPerPage);

  // توجه: JSONPlaceholder تعداد کل پست‌ها رو نمی‌ده، برای واقعی باید API واقعی total بده
  const totalPosts = 100; // ثابت چون می‌دونیم 100 پست داره
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Posts List</h1>

      {/* Grid نمایش پست‌ها */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl bg-white p-4 shadow hover:shadow-lg transition"
          >
            <a
              href={`/posts/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <a
          href={`/posts?page=${currentPage - 1}`}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 opacity-50 pointer-events-none"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          قبلی
        </a>

        {[...Array(totalPages)].map((_, index) => (
          <a
            key={index + 1}
            href={`/posts?page=${index + 1}`}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </a>
        ))}

        <a
          href={`/posts?page=${currentPage + 1}`}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 opacity-50 pointer-events-none"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          بعدی
        </a>
      </div>
    </main>
  );
}
