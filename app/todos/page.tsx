// app/todos/page.tsx
import { Todo } from "@/types/todo";
import { fetchFromApi } from "@/lib/api";

async function fetchTodos(): Promise<Todo[]> {
  return fetchFromApi<Todo[]>("/todos?_limit=10");
}

export default async function TodosPage() {
  const todos = await fetchTodos();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">

      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
         Your Daily Todos
      </h1>

      <ul className="mt-6 space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center space-x-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-green-300"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="w-6 h-6 accent-green-500 cursor-pointer transition-all duration-200"
            />
            <span
              className={`text-gray-800 text-lg font-medium ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
