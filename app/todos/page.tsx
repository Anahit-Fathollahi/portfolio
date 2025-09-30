// app/todos/page.tsx
import { Todo } from "@/types/todo";
import { fetchFromApi } from "@/lib/api";

async function fetchTodos(): Promise<Todo[]> {
  return fetchFromApi<Todo[]>("/todos?_limit=10");
}

export default async function TodosPage() {
  const todos = await fetchTodos();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Todos List</h1>
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center space-x-2 bg-white p-3 rounded-xl shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="w-5 h-5"
            />
            <span
              className={`text-gray-800 ${
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
