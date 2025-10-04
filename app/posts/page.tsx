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
  const postsPerPage = 21;

  const posts = await fetchPosts(currentPage, postsPerPage);

  const totalPosts = 100;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* عنوان شیک */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Stories Await Your Eyes 
      </h1>

      {/* لیست پست‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative rounded-3xl p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
          >
            <a
              href={`/posts/${post.id}`}
              className="block text-xl font-bold text-gray-800 hover:text-blue-600 truncate mb-2"
              title={post.title}
            >
              {post.title}
            </a>
            <p className="text-gray-500 text-sm line-clamp-4">
              {post.body || "No description available."}
            </p>
            <span className="absolute top-4 right-4 text-gray-300 text-sm">
              #{post.id}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 space-x-3">
        <a
          href={`/posts?page=${currentPage - 1}`}
          className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 pointer-events-none"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          قبلی
        </a>

        {[...Array(totalPages)].map((_, index) => (
          <a
            key={index + 1}
            href={`/posts?page=${index + 1}`}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </a>
        ))}

        <a
          href={`/posts?page=${currentPage + 1}`}
          className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 pointer-events-none"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          بعدی
        </a>
      </div>
    </main>
  );
}
